import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EjercicioContainerComponent } from '../../components/entrenamiento/ejercicio-container/ejercicio-container.component';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppAlertComponent } from '../../components/app-alert/app-alert.component';
import { IEjercicio } from '../../models/ejercicio.model';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';

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
	alertType: string = "";
	alertMessage: string = "";
	showAlert: boolean = false;

	private _router = inject(Router)
	private _apiService = inject(ApiService)
	_sharedService = inject(SharedService)
	
	constructor(private formBuilder: FormBuilder) {
		this.entrenamientoForm = this.formBuilder.group({
			name: ['', Validators.required],
			description: [''],
			ejercicios: this.formBuilder.array([])
		})
	}

	ngOnInit(): void {
		this._apiService.getAll("ejercicios").subscribe(
			result => { this.ejerciciosList = result },
			error => {
				this.showAlert = true;
				this.alertType = "danger";
				this.alertMessage = `No se han podido cargar los ejercicios. ${error.message}`;
			}
		)
	}
	
	get ejercicios() {
		return (this.entrenamientoForm.get('ejercicios') as FormArray)
	}

	addEjercicio() {
		let ejercicioForm = this.formBuilder.group({
			ejercicio: [ null, Validators.required ],
			objetivoRepeticiones: [ 0, Validators.required ],
			series: this.formBuilder.array([])
		})
		this.ejercicios.push(ejercicioForm);
	}

	removeEjercicio(ejercicioIndex: number) {
		console.log(ejercicioIndex);
	}

	save() {
		console.log(this.entrenamientoForm?.value)
	}
	
	goBack() {
		this._router.navigate(['/entrenamientos']);
	}

	hasErrors(field: string, typeError: string) {
		return this.entrenamientoForm.get(field)?.hasError(typeError) && this.entrenamientoForm.get(field)?.touched;
	}
}
