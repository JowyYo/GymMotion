import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EjercicioContainerComponent } from '../../components/entrenamiento/ejercicio-container/ejercicio-container.component';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppAlertComponent } from '../../components/app-alert/app-alert.component';
import { IEjercicio } from '../../models/ejercicio.model';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
import { finalize, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { IEntrenamiento, IEntrenamientoEjercicio, ISerie } from '../../models/entrenamiento.model';
import { NIL as EMPTY_GUID } from 'uuid';

@Component({
  selector: 'app-entrenamiento-details',
  imports: [ ReactiveFormsModule, CommonModule, EjercicioContainerComponent, FontAwesomeModule, AppAlertComponent ],
  templateUrl: './entrenamiento-details.component.html',
  styleUrl: './entrenamiento-details.component.css'
})

export class EntrenamientoDetailsComponent implements OnInit, OnDestroy {

	faArrowLeft = faArrowLeft;

	entrenamiento?: IEntrenamiento
	ejerciciosList: IEjercicio[] = [];
	entrenamientoForm!: FormGroup;
	isLoading: boolean = false;
	entrenamientoId?: string;
	currentDate: Date = new Date();

	alertType: string = "";
	alertMessage: string = "";
	showAlert: boolean = false;

	destroy$ = new Subject<void>();
	private _activatedRouter = inject(ActivatedRoute);
	private _apiService = inject(ApiService)
	private _formBuilder = inject(FormBuilder);
	_sharedService = inject(SharedService)

	ngOnInit(): void {
		this.isLoading = true;
		this._activatedRouter.params
			.pipe(
				takeUntil(this.destroy$),
				tap(() => {
					this._apiService.getAll("ejercicios").pipe(takeUntil(this.destroy$)).subscribe(
						result => { this.ejerciciosList = result },
						error => {
							this.showAlertMessage("danger", `No se han podido cargar los ejercicios. ${error.message}`);
						}
					)
				}),
				switchMap(
					params => {
						this.entrenamientoId = params['entrenamientoId'];
				
						if (this.entrenamientoId !== "new")
							return this._apiService.getById('entrenamientos', this.entrenamientoId!);
						else
							return of(null);
					} 
				)
			)
			.subscribe(
				(data: IEntrenamiento) => {
					this.entrenamiento = data;
					this.entrenamientoForm = this._formBuilder.group({
						id: [data?.id || EMPTY_GUID],
						name: [data?.name, Validators.required],
						description: [data?.description],
						ejercicios: this._formBuilder.array(
							data != null ?
							data?.ejercicios.map(
								(ejercicio: IEntrenamientoEjercicio) => {
									return this._formBuilder.group({
										id: [ejercicio?.id || EMPTY_GUID],
										ejercicioId: [ejercicio?.ejercicioId, Validators.required],
										repeticionesObjetivo: [ejercicio?.repeticionesObjetivo, Validators.required],
										series: this._formBuilder.array(
											ejercicio != null ?
												ejercicio?.series.map(
													(serie: ISerie) => {
														return this._formBuilder.group({
															id: [serie?.id || EMPTY_GUID],
															repeticiones: [serie?.repeticiones, Validators.required],
															peso: [serie?.peso, Validators.required]
														})
													}
												) : []
										)
									})
								}
							) : []
						)
					});
					this.isLoading = false;
				}
			)
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
	
	get ejercicios() {
		return (this.entrenamientoForm.get('ejercicios') as FormArray)
	}

	addEjercicio() {
		let ejercicioForm = this._formBuilder.group({
			id: [EMPTY_GUID],
			ejercicioId: [null, Validators.required],
			repeticionesObjetivo: [null, Validators.required],
			series: this._formBuilder.array([])
		})
		this.ejercicios.push(ejercicioForm);
	}

	removeEjercicio(ejercicioIndex: number) {
		this.ejercicios.removeAt(ejercicioIndex);
	}

	save() {
		this.showAlert = false;
		this.isLoading = true;
		
		if (this.entrenamientoForm.valid) {
			this.entrenamientoId == "new" ? this.createEntrenamiento() : this.updateEntrenamiento();
		} else {
			this._sharedService.markFormFieldsAsTouched(this.entrenamientoForm);
			this.showAlertMessage("danger", "Hay campos obligatorios sin informar.");

			this.isLoading = false;
		}
	}

	createEntrenamiento() {
		this._apiService.create('entrenamientos', this.entrenamientoForm?.value)
			.pipe(
				takeUntil(this.destroy$),
				finalize(() => { this.isLoading = false; })
			)
			.subscribe(
				data => {
					this._sharedService.goToPath(`entrenamientos/${data.id}`);
					this.showAlertMessage("success", "Se ha guardado el entrenamiento correctamente.");
					setTimeout(() => { this.showAlert = false; }, 1500);
				},
				error => {
					console.log(error)
					this.showAlertMessage("danger", error.error);
				}
			)
	}

	updateEntrenamiento() {
		this._apiService.update('entrenamientos', this.entrenamientoId!, this.entrenamientoForm?.value)
			.pipe(
				takeUntil(this.destroy$),
				finalize(() => { this.isLoading = false; })
			)
			.subscribe(
				data => {
					this.showAlertMessage("success", "Se ha guardado el entrenamiento correctamente.");
					setTimeout(() => { this.showAlert = false; }, 1500);
				},
				error => {
					console.log(error)
					this.showAlertMessage("danger", error.error);
				}
			)
	}
	
	showAlertMessage(type: string, message: string) {
		this.showAlert = true;
		this.alertType = type;
		this.alertMessage = message;
	}
}
