import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SerieContainerComponent } from '../serie-container/serie-container.component';
import { IEjercicio } from '../../../models/ejercicio.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedService } from '../../../services/shared.service';

@Component({
	selector: 'app-ejercicio-container',
	imports: [ CommonModule, ReactiveFormsModule, SerieContainerComponent, FontAwesomeModule ],
	templateUrl: './ejercicio-container.component.html',
	styleUrl: './ejercicio-container.component.css'
})
export class EjercicioContainerComponent {

	faTrash = faTrash;

	@Input() ejercicioForm!: AbstractControl;
	@Input() ejerciciosList: IEjercicio[] = [];
	@Input() ejercicioIndex?: number

	@Output() ejercicioToRemove = new EventEmitter<number>();

	private _formBuilder = inject(FormBuilder);
	_sharedService = inject(SharedService)
	
	get ejercicioFormGroup(): FormGroup {
		return this.ejercicioForm as FormGroup;
	}

	get series() {
		return (this.ejercicioFormGroup.get('series') as FormArray)
	}

	addSerie() {
		let serieForm = this._formBuilder.group({
			repeticiones: [ 0, Validators.required ],
			peso: [ 0, Validators.required ]
		})
		this.series.push(serieForm);
	}

	removeSerie(serieIndex: number) {
		console.log(serieIndex);
	}

	removeEjercicio() {
		this.ejercicioToRemove.emit(this.ejercicioIndex)
	}
}
