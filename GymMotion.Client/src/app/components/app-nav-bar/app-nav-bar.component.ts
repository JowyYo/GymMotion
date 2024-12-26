import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './app-nav-bar.component.html',
  styleUrl: './app-nav-bar.component.css'
})
export class AppNavBarComponent implements OnInit, OnDestroy {

  activePage: string = '';
  private destroy$ = new Subject<void>();
  private _router = inject(Router)
  
  ngOnInit(): void {
    this._router.events.pipe(takeUntil(this.destroy$)).subscribe(
      event => {
        if (event instanceof NavigationEnd)
          this.activePage = event.url.split('/')[1];
      }
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
