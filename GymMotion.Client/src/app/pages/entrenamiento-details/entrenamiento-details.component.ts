import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EjercicioContainerComponent } from '../../components/entrenamiento/ejercicio-container/ejercicio-container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppAlertComponent } from '../../components/app-alert/app-alert.component';
import { IEjercicio } from '../../models/ejercicio.model';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
import { finalize, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-entrenamiento-details',
  imports: [ ReactiveFormsModule, CommonModule, EjercicioContainerComponent, FontAwesomeModule, AppAlertComponent ],
  templateUrl: './entrenamiento-details.component.html',
  styleUrl: './entrenamiento-details.component.css'
})

export class EntrenamientoDetailsComponent implements OnInit {

	faArrowLeft = faArrowLeft;

	ejerciciosList: IEjercicio[] = [];
	entrenamientoForm!: FormGroup;
	isLoading: boolean = false;
	entrenamientoId?: string;

	alertType: string = "";
	alertMessage: string = "";
	showAlert: boolean = false;

	private _activatedRouter = inject(ActivatedRoute);
	private _apiService = inject(ApiService)
	private _formBuilder = inject(FormBuilder);
	_sharedService = inject(SharedService)

	ngOnInit(): void {
		this.isLoading = true;
		this._activatedRouter.params
			.pipe(
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
				data => {
					this.entrenamientoForm = this._formBuilder.group({
						name: ['', Validators.required],
						description: [''],
						ejercicios: this._formBuilder.array([])
					});
					this.isLoading = false;
				}
			)
		this._apiService.getAll("ejercicios").subscribe(
			result => { this.ejerciciosList = result },
			error => {
				this.showAlertMessage("danger", `No se han podido cargar los ejercicios. ${error.message}`);
			}
		)
	}
	
	get ejercicios() {
		return (this.entrenamientoForm.get('ejercicios') as FormArray)
	}

	addEjercicio() {
		let ejercicioForm = this._formBuilder.group({
			ejercicio: [ null, Validators.required ],
			objetivoRepeticiones: [ null, Validators.required ],
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
				finalize(() => { this.isLoading = false; })
			)
			.subscribe(
				data => {
					this._sharedService.goToPath(`entrenamientos/${data.id}`);
					this.showAlertMessage("success", "Se ha guardado el entrenamiento correctamente.");
					setTimeout(() => { this.showAlert = false; }, 1500);
				},
				error => {
					this.showAlertMessage("danger", error.message);
				}
			)
	}

	updateEntrenamiento() {
		this._apiService.update('entrenamientos', this.entrenamientoId!, this.entrenamientoForm?.value)
			.pipe(
				finalize(() => { this.isLoading = false; })
			)
			.subscribe(
				data => {
					this.showAlertMessage("success", "Se ha guardado el entrenamiento correctamente.");
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
