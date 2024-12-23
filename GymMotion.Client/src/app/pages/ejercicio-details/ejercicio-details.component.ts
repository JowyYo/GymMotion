import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GrupoMuscular } from '../../models/ejercicio.model';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription, switchMap } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { PageLoadingComponent } from '../../components/page-loading/page-loading.component';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
	selector: 'app-ejercicio-details',
	imports: [ ReactiveFormsModule, CommonModule, PageLoadingComponent, FontAwesomeModule ],
	templateUrl: './ejercicio-details.component.html',
	styleUrl: './ejercicio-details.component.css'
})
export class EjercicioDetailsComponent implements OnInit, OnDestroy {
	faCircleArrowLeft = faCircleArrowLeft;

	ejercicioForm!: FormGroup;
	paramsSubscription: Subscription = new Subscription();
	apiServiceSubscription?: Subscription
	gruposMuscular = Object.values(GrupoMuscular);
	isLoading: boolean = false;
	ejercicioId?: string;

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
		this.ejercicioId == "new" ? this.addEjercicio() : this.updateEjercicio();
	}

	addEjercicio() {
		this._apiService.add('ejercicios', this.ejercicioForm?.value)
			.subscribe(
				data => {
					console.log("success", data)
				},
				error => {
					console.log("error", error)
				}
			)
	}

	updateEjercicio() {
		this._apiService.update('ejercicios', this.ejercicioId!, this.ejercicioForm?.value)
			.subscribe(
				data => {
					console.log("success", data)
				},
				error => {
					console.log("error", error)
				}
			)
	}

	hasErrors(field: string, typeError: string) {
		return this.ejercicioForm.get(field)?.hasError(typeError) && this.ejercicioForm.get(field)?.touched;
	}
}
