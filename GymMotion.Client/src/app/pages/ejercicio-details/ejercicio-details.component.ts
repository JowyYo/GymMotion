import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GrupoMuscular } from '../../models/ejercicio.model';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription, switchMap } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { PageLoadingComponent } from '../../components/page-loading/page-loading.component';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppAlertComponent } from '../../components/app-alert/app-alert.component';

@Component({
	selector: 'app-ejercicio-details',
	imports: [ ReactiveFormsModule, CommonModule, PageLoadingComponent, FontAwesomeModule, AppAlertComponent ],
	templateUrl: './ejercicio-details.component.html',
	styleUrl: './ejercicio-details.component.css'
})
export class EjercicioDetailsComponent implements OnInit, OnDestroy {
	faArrowLeft = faArrowLeft;

	ejercicioForm!: FormGroup;
	paramsSubscription: Subscription = new Subscription();
	apiServiceSubscription?: Subscription
	gruposMuscular = Object.entries(GrupoMuscular)
		.filter(([key, value]) => isNaN(Number(key)))
		.map(([key, value]) => ({ id: value as number, name: key }));;
	isLoading: boolean = false;
	ejercicioId?: string;
	
	alertType: string = "";
	alertMessage: string = "";
	showAlert: boolean = false;

	private _activatedRouter = inject(ActivatedRoute);
	private _router = inject(Router);
	private _apiService = inject(ApiService);
	private _formBuilder = inject(FormBuilder);
	
	ngOnInit(): void {
		this.isLoading = true;
		this.paramsSubscription = this._activatedRouter.params
		.pipe(
			switchMap(
				params => {
					this.ejercicioId = params['ejercicioId'];
			
					if (this.ejercicioId !== "new")
						return this._apiService.getById('ejercicios', this.ejercicioId!);
					else
						return of(null);
				} 
			)
		)
		.subscribe(
			data => {
				this.ejercicioForm = this._formBuilder.group({
					name: [data?.name, Validators.required],
					description: [data?.description],
					group: [data?.group, Validators.required]
				})
				this.isLoading = false;
			}
		)
	}
	
	ngOnDestroy(): void {
		if (this.paramsSubscription)
			this.paramsSubscription.unsubscribe();
		if (this.apiServiceSubscription)
			this.apiServiceSubscription.unsubscribe();
	}

	goBack() {
		this._router.navigate(['/ejercicios']);
	}

	save() {
		this.showAlert = false;

		if (this.ejercicioForm.valid) {
			this.ejercicioId == "new" ? this.addEjercicio() : this.updateEjercicio();
		} else {
			this.markFormFieldsAsTouched();
			this.alertMessage = "Hay campos obligatorios sin informar."
			this.alertType = "danger";
			this.showAlert = true;
		}
	}

	markFormFieldsAsTouched() {
		Object.keys(this.ejercicioForm.controls).forEach(field => {
			const control = this.ejercicioForm.get(field);
			if (control) {
			  control.markAsTouched();
			}
		});
	}

	addEjercicio() {
		this._apiService.add('ejercicios', this.ejercicioForm?.value)
			.subscribe(
				data => {
					this._router.navigate([`ejercicios/${data.id}`])
					this.showAlert = true;
					this.alertType = "success";
					this.alertMessage = "Se ha guardado el ejercicio correctamente.";
					setTimeout(() => { this.showAlert = false; }, 1500);
				},
				error => {
					this.showAlert = true;
					this.alertType = "danger";
					this.alertMessage = error.message;
				}
			)
	}

	updateEjercicio() {
		this._apiService.update('ejercicios', this.ejercicioId!, this.ejercicioForm?.value)
			.subscribe(
				data => {
					this.showAlert = true;
					this.alertType = "success";
					this.alertMessage = "Se ha guardado el ejercicio correctamente.";
					setTimeout(() => { this.showAlert = false; }, 1500);
				},
				error => {
					this.showAlert = true;
					this.alertType = "danger";
					this.alertMessage = error.message;
				}
			)
	}

	hasErrors(field: string, typeError: string) {
		return this.ejercicioForm.get(field)?.hasError(typeError) && this.ejercicioForm.get(field)?.touched;
	}
}
