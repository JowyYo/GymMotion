import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITableColumn } from '../../models/table-column.model'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [ FontAwesomeModule, CommonModule ],
  templateUrl: './app-table.component.html',
  styleUrl: './app-table.component.css'
})
export class AppTableComponent {
  
  faPencil = faPencil

  @Input({required: true}) columns: ITableColumn[] = []
  @Input({required: true}) data: any[] = []
  
  @Output() goToDetails = new EventEmitter<number>();

  onGoToDetails(id: number) {
    this.goToDetails.emit(id)
  }
}