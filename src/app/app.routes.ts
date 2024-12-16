import { Routes } from '@angular/router';
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { EjercicioDetailsComponent } from './ejercicio-details/ejercicio-details.component';

export const routes: Routes = [
    { path: '', component: EntrenamientoComponent },
    { path: 'ejercicios', component: EjerciciosComponent },
    { path: 'ejercicios/:ejercicioId', component: EjercicioDetailsComponent }
];
