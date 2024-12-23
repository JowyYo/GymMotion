import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-loading',
  imports: [ CommonModule ],
  templateUrl: './page-loading.component.html',
  styleUrl: './page-loading.component.css'
})
export class PageLoadingComponent {

	@Input() isLoading = false;
}
