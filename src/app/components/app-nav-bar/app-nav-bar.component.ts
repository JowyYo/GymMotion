import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterModule],
  templateUrl: './app-nav-bar.component.html',
  styleUrl: './app-nav-bar.component.css'
})
export class AppNavBarComponent {
  activePage: string = 'entrenamientos'

  isActivePage(pageName: string): boolean {
    return pageName == this.activePage
  }

  setActivePage(pageName: string): void {
    this.activePage = pageName
  }
}
