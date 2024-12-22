import { Routes } from '@angular/router';
import { EntrenamientosComponent } from './pages/entrenamientos/entrenamientos.component';
import { EjerciciosComponent } from './pages/ejercicios/ejercicios.component';
import { EjercicioDetailsComponent } from './pages/ejercicio-details/ejercicio-details.component';
import { HomeComponent } from './pages/home/home.component';
import { EntrenamientoDetailsComponent } from './pages/entrenamiento-details/entrenamiento-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'entrenamientos', component: EntrenamientosComponent },
    { path: 'entrenamientos/:entrenamientoId', component: EntrenamientoDetailsComponent },
    { path: 'ejercicios', component: EjerciciosComponent },
    { path: 'ejercicios/:ejercicioId', component: EjercicioDetailsComponent }
];
