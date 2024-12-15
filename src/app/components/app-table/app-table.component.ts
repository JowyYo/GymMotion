import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './app-table.component.html',
  styleUrl: './app-table.component.css'
})
export class AppTableComponent {
  @Input() columns: TableColumn[] = []
  @Input() data: any[] = []
}

export interface TableColumn {
  field: string,
  header: string
}