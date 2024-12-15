import { Routes } from '@angular/router';
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';

export const routes: Routes = [
    { path: '', component: EntrenamientoComponent },
    { path: 'ejercicios', component: EjerciciosComponent }
];
