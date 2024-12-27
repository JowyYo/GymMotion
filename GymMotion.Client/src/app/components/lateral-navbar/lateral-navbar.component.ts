import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { faHome, faDumbbell, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-lateral-navbar',
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './lateral-navbar.component.html',
  styleUrl: './lateral-navbar.component.css'
})
export class LateralNavbarComponent {
	faHome = faHome; faDumbbell= faDumbbell; faList = faList;

	collapsed: boolean = false;
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
