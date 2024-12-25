import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-serie-container',
  imports: [ ReactiveFormsModule, CommonModule, FontAwesomeModule ],
  templateUrl: './serie-container.component.html',
  styleUrl: './serie-container.component.css'
})

export class SerieContainerComponent {
	
	faTrash = faTrash;

	@Input() serieForm!: AbstractControl;
	@Input() serieIndex?: number

	@Output() serieToRemove = new EventEmitter<number>();

	get serieFormGroup(): FormGroup {
		return this.serieForm as FormGroup;
	}

	removeSerie() {
		this.serieToRemove.emit(this.serieIndex);
	}

	hasErrors(field: string, typeError: string) {
		return this.serieFormGroup.get(field)?.hasError(typeError) && this.serieFormGroup.get(field)?.touched;
	}
}
