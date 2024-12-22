import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
	selector: 'app-ejercicio-container',
	imports: [ CommonModule, ReactiveFormsModule ],
	templateUrl: './ejercicio-container.component.html',
	styleUrl: './ejercicio-container.component.css'
})
export class EjercicioContainerComponent {

	@Input() ejercicioForm!: AbstractControl;

	private _formBuilder = inject(FormBuilder);
	
	get ejercicioFormGroup(): FormGroup {
		return this.ejercicioForm as FormGroup;
	}

	hasErrors(field: string, typeError: string) {
		return this.ejercicioFormGroup.get(field)?.hasError(typeError) && this.ejercicioFormGroup.get(field)?.touched;
	}
}
