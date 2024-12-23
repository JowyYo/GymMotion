import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EjercicioContainerComponent } from '../../components/entrenamiento/ejercicio-container/ejercicio-container.component';

@Component({
  selector: 'app-entrenamiento-details',
  imports: [ ReactiveFormsModule, CommonModule, EjercicioContainerComponent ],
  templateUrl: './entrenamiento-details.component.html',
  styleUrl: './entrenamiento-details.component.css'
})

export class EntrenamientoDetailsComponent implements OnInit {

	entrenamientoForm!: FormGroup;
	
	constructor(private formBuilder: FormBuilder) {
		this.entrenamientoForm = this.formBuilder.group({
			name: ['', Validators.required],
			description: [''],
			ejercicios: this.formBuilder.array([])
		})
	}
	
	ngOnInit(): void {
		throw new Error('Method not implemented.');
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

	hasErrors(field: string, typeError: string) {
		return this.entrenamientoForm.get(field)?.hasError(typeError) && this.entrenamientoForm.get(field)?.touched;
	}
}
