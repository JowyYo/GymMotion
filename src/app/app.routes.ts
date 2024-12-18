import { Routes } from '@angular/router';
import { EntrenamientoComponent } from './pages/entrenamiento/entrenamiento.component';
import { EjerciciosComponent } from './pages/ejercicios/ejercicios.component';
import { EjercicioDetailsComponent } from './pages/ejercicio-details/ejercicio-details.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'entrenamientos', component: EntrenamientoComponent },
    { path: 'ejercicios', component: EjerciciosComponent },
    { path: 'ejercicios/:ejercicioId', component: EjercicioDetailsComponent }
];
