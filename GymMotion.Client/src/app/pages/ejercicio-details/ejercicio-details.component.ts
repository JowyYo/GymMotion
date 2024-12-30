import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GrupoMuscular } from '../../models/ejercicio.model';
import { ActivatedRoute } from '@angular/router';
import { finalize, of, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { PageLoadingComponent } from '../../components/page-loading/page-loading.component';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppAlertComponent } from '../../components/app-alert/app-alert.component';
import { SharedService } from '../../services/shared.service';

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

	private destroy$ = new Subject<void>();
	private _activatedRouter = inject(ActivatedRoute);
	private _apiService = inject(ApiService);
	private _formBuilder = inject(FormBuilder);
	_sharedService = inject(SharedService);
	
	ngOnInit(): void {
		this.isLoading = true;
		this._activatedRouter.params
			.pipe(
				takeUntil(this.destroy$),
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
		this.destroy$.next();
		this.destroy$.complete();
	}

	save() {
		this.showAlert = false;
		this.isLoading = true;

		if (this.ejercicioForm.valid) {
			this.ejercicioId == "new" ? this.createEjercicio() : this.updateEjercicio();
		} else {
			this._sharedService.markFormFieldsAsTouched(this.ejercicioForm);
			this.showAlertMessage("danger", "Hay campos obligatorios sin informar.");
			
			this.isLoading = false;
		}
	}

	createEjercicio() {
		this._apiService.post('ejercicios', this.ejercicioForm?.value)
			.pipe(
				takeUntil(this.destroy$),
				finalize(() => { this.isLoading = false; })
			)
			.subscribe(
				data => {
					this._sharedService.goToPath(`ejercicios/${data.id}`);
					this.showAlertMessage("success", "Se ha guardado el ejercicio correctamente.");
					setTimeout(() => { this.showAlert = false; }, 1500);
				},
				error => {
					this.showAlertMessage("danger", error.message);
				}
			)
	}

	updateEjercicio() {
		this._apiService.put('ejercicios', this.ejercicioId!, this.ejercicioForm?.value)
			.pipe(
				takeUntil(this.destroy$),
				finalize(() => { this.isLoading = false; })
			)
			.subscribe(
				data => {
					this.showAlertMessage("success", "Se ha guardado el ejercicio correctamente.");
					setTimeout(() => { this.showAlert = false; }, 1500);					
				},
				error => {
					this.showAlertMessage("danger", error.message);
				}
			)
	}

	showAlertMessage(type: string, message: string) {
		this.showAlert = true;
		this.alertType = type;
		this.alertMessage = message;
	}
}
