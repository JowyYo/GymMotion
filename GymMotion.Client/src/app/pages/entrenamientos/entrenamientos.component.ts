import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ITableColumn } from '../../models/table-column.model';
import { IEntrenamientoList } from '../../models/entrenamiento-list.model';
import { AppTableComponent } from '../../components/app-table/app-table.component';

@Component({
  selector: 'app-entrenamientos',
  imports: [ CommonModule, RouterModule, AppTableComponent ],
  templateUrl: './entrenamientos.component.html',
  styleUrl: './entrenamientos.component.css'
})

export class EntrenamientosComponent {

  entrenamientosList: IEntrenamientoList[] = []
  tableColumns: ITableColumn[] = [
    { field: "name", header: "Name" },
    { field: "description", header: "Description" }
  ]

  private _router = inject(Router)

  ngOnInit() {
    this.entrenamientosList = [
      {
        id: 1,
        name: "Tirón (sem. 1)",
        description: "Dolor en el hombro izquierdo a la hora de hacer el press banca"
      },
      {
        id: 2,
        name: "Jalón al pecho"
      }
    ]
  }
  
  goToEntrenamientoDetails(id: number): void {
    this._router.navigate([`/entrenamientos/${id}`])
  }
}
