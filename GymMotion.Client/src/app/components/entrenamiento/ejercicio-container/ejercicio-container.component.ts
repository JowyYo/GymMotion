import { CommonModule, KeyValue } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SerieContainerComponent } from '../serie-container/serie-container.component';
import { IEjercicio } from '../../../models/ejercicio.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedService } from '../../../services/shared.service';
import { NIL as EMPTY_GUID } from 'uuid';
import { SearcheableSelectorComponent } from '../../searcheable-selector/searcheable-selector.component';

@Component({
	selector: 'app-ejercicio-container',
	imports: [ CommonModule, ReactiveFormsModule, SerieContainerComponent, FontAwesomeModule, SearcheableSelectorComponent ],
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

	get ejercicioOptions(): KeyValue<string, string>[] {
		return this.ejerciciosList.map((ejercicio: IEjercicio) => ({ key: ejercicio.id, value: ejercicio.name }))
	}
	
	get selectedEjercicio(): string {
		return (this.ejercicioFormGroup.get('ejercicioId') as FormControl).value;
	}

	addSerie() {
		let serieForm = this._formBuilder.group({
			id: [EMPTY_GUID],
			repeticiones: [ null, Validators.required ],
			peso: [ null, Validators.required ]
		})
		this.series.push(serieForm);
	}

	removeSerie(serieIndex: number) {
		this.series.removeAt(serieIndex);
	}

	removeEjercicio() {
		this.ejercicioToRemove.emit(this.ejercicioIndex)
	}

	ejercicioOptionChange(ejercicioId: any) {
		(this.ejercicioFormGroup.get('ejercicioId') as FormControl).setValue(ejercicioId);
	}
}
