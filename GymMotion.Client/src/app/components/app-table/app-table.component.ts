import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITableColumn } from '../../models/table-column.model'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { GrupoMuscular } from '../../models/ejercicio.model';

@Component({
	selector: 'app-table',
	imports: [ FontAwesomeModule, CommonModule ],
	templateUrl: './app-table.component.html',
	styleUrl: './app-table.component.css'
})
export class AppTableComponent {
  
	faPencil = faPencil;
	faTrash = faTrash;

	enumTypes = [ GrupoMuscular ]

	@Input({required: true}) columns: ITableColumn[] = []
	@Input({required: true}) data?: any[] = []
	
	@Output() goToDetails = new EventEmitter<string>();
	@Output() deleteRegister = new EventEmitter<string>();

	getColumnValue(value: any): string {
		const enumData = this.findEnumType(value);
		if (enumData) {
		  const { enumType } = enumData;
		  return Object.keys(enumType).find(key => enumType[key] === value) || '';
		}

		return value;
	}

	findEnumType(value: any): { enumName: string; enumType: any } | null {
		for (const [enumName, enumType] of Object.entries(this.enumTypes)) {
		  if (Object.values(enumType).includes(value)) {
			return { enumName, enumType };
		  }
		}
		return null; // No es parte de ningún enum conocido
	}

	onGoToDetails(id: string) {
		this.goToDetails.emit(id)
	}

	onDeleteRegister(event: Event, id: string) {
		event.stopPropagation();
		this.deleteRegister.emit(id);
	}
}