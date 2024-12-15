import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-ejercicios',
  imports: [ CommonModule, FontAwesomeModule ],
  templateUrl: './ejercicios.component.html',
  styleUrl: './ejercicios.component.css'
})

export class EjerciciosComponent implements OnInit {

  faPencil = faPencil
  ejerciciosList: Ejercicio[] = []

  ngOnInit() {
    this.ejerciciosList = [
      {
        name: "Press banca",
        description: "Ejercicio básico de pectoral",
        group: GrupoMuscular.Pectoral
      },
      {
        name: "Jalón al pecho",
        description: "Ejercicio enfocado en la zona del trapecio",
        group: GrupoMuscular.Espalda
      }
    ]
  }
}

export interface Ejercicio {
  name: string,
  description?: string,
  group: GrupoMuscular
}

export enum GrupoMuscular {
  Espalda,
  Pectoral,
  Hombro,
  Bíceps,
  Tríceps,
  Antebrazo,
  Cuadriceps,
  Femoral,
  Gluteo,
  Gemelo
}