import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-ejercicio-container',
	imports: [ CommonModule ],
	templateUrl: './ejercicio-container.component.html',
	styleUrl: './ejercicio-container.component.css'
})
export class EjercicioContainerComponent {

	ejercicioForm!: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.ejercicioForm = this.formBuilder.group({
			ejercicio: [ null, Validators.required ],
			objetivoRepeticiones: [ 0, Validators.required ],
			series: this.formBuilder.array([])
		})
	}
}
