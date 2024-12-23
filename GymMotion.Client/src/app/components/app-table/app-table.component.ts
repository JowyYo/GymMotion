import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITableColumn } from '../../models/table-column.model'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-table',
	imports: [ FontAwesomeModule, CommonModule ],
	templateUrl: './app-table.component.html',
	styleUrl: './app-table.component.css'
})
export class AppTableComponent {
  
	faPencil = faPencil;
	faTrash = faTrash;

	@Input({required: true}) columns: ITableColumn[] = []
	@Input({required: true}) data: any[] = []
	
	@Output() goToDetails = new EventEmitter<string>();
	@Output() deleteRegister = new EventEmitter<string>();

	onGoToDetails(id: string) {
		this.goToDetails.emit(id)
	}

	onDeleteRegister(id: string) {
		this.deleteRegister.emit(id);
	}
}