import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITableColumn } from '../models/table-column.model';
import { AppTableComponent } from '../components/app-table/app-table.component';
import { GrupoMuscular, IEjercicio } from '../models/ejercicio.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ejercicios',
  imports: [ CommonModule, AppTableComponent, RouterModule ],
  templateUrl: './ejercicios.component.html',
  styleUrl: './ejercicios.component.css'
})

export class EjerciciosComponent implements OnInit {

  ejerciciosList: IEjercicio[] = []
  tableColumns: ITableColumn[] = [
    { field: "name", header: "Name" },
    { field: "description", header: "Description" },
    { field: "group", header: "Group" },
  ]

  private _router = inject(Router)

  ngOnInit() {
    this.ejerciciosList = [
      {
        id: 1,
        name: "Press banca",
        description: "Ejercicio básico de pectoral",
        group: GrupoMuscular.Pectoral
      },
      {
        id: 2,
        name: "Jalón al pecho",
        description: "Ejercicio enfocado en la zona del trapecio",
        group: GrupoMuscular.Espalda
      }
    ]
  }
  
  goToEjercicioDetails(id: number): void {
    this._router.navigate([`/ejercicios/${id}`])
  }
}