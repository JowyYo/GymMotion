import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavBarComponent } from './components/app-nav-bar/app-nav-bar.component';
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppNavBarComponent, EntrenamientoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'curso-angular';
}
