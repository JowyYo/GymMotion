import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EjercicioContainerComponent } from '../../components/entrenamiento/ejercicio-container/ejercicio-container.component';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppAlertComponent } from '../../components/app-alert/app-alert.component';

@Component({
  selector: 'app-entrenamiento-details',
  imports: [ ReactiveFormsModule, CommonModule, EjercicioContainerComponent, FontAwesomeModule, AppAlertComponent ],
  templateUrl: './entrenamiento-details.component.html',
  styleUrl: './entrenamiento-details.component.css'
})

export class EntrenamientoDetailsComponent {

	faArrowLeft = faArrowLeft;

	entrenamientoForm!: FormGroup;
	alertType: string = "";
	alertMessage: string = "";
	showAlert: boolean = false;

	private _router = inject(Router)
	
	constructor(private formBuilder: FormBuilder) {
		this.entrenamientoForm = this.formBuilder.group({
			name: ['', Validators.required],
			description: [''],
			ejercicios: this.formBuilder.array([])
		})
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
