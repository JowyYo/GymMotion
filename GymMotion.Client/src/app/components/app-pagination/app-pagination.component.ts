import { Component, computed, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './app-pagination.component.html',
  styleUrl: './app-pagination.component.css'
})
export class AppPaginationComponent {

	firstPageItem = computed(() => this.currentPage() > 1 ? ((this.currentPage() - 1) * this.pageSize + 1) : 1);
	lastPageItem = computed(() => this.firstPageItem() + this.pageSize - 1);
	currentPage = input<number>(1);
	@Input() pageSize: number = 1;
	@Input() totalPages: number = 1;
	@Input() totalItems: number = 1;

	@Output() onSetPage = new EventEmitter<number>();
	
	setPage(page: number) {
		this.onSetPage.emit(page);
	}
}
