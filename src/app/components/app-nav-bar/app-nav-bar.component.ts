import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './app-nav-bar.component.html',
  styleUrl: './app-nav-bar.component.css'
})
export class AppNavBarComponent implements OnInit, OnDestroy {

  activePage: string = '';
  private routerSubscription: Subscription = new Subscription;
  private _router = inject(Router)
  
  ngOnInit(): void {
    this.routerSubscription = this._router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd)
          this.activePage = event.url.split('/')[1];
      }
    )
  }

  ngOnDestroy(): void {
    if (this.routerSubscription)
      this.routerSubscription.unsubscribe();
  }
  
  isActivePage(pageName: string): boolean {
    return pageName == this.activePage
  }
}
