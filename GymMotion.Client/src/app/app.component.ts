import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LateralNavbarComponent } from './components/lateral-navbar/lateral-navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LateralNavbarComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'curso-angular';
}
