import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ITableColumn } from '../../models/table-column.model';
import { IEntrenamientoList } from '../../models/entrenamiento-list.model';
import { AppTableComponent } from '../../components/app-table/app-table.component';
import { ApiService } from '../../services/api.service';
import { AppAlertComponent } from '../../components/app-alert/app-alert.component';
import { AppPaginationComponent } from '../../components/app-pagination/app-pagination.component';
import { AppModalComponent } from '../../components/app-modal/app-modal.component';
import { IPagination } from '../../models/pagination.model';
import { PageLoadingComponent } from '../../components/page-loading/page-loading.component';
import { finalize } from 'rxjs';

@Component({
	selector: 'app-entrenamientos',
	imports: [ CommonModule, RouterModule, AppTableComponent, AppAlertComponent, AppPaginationComponent, AppModalComponent, PageLoadingComponent ],
	templateUrl: './entrenamientos.component.html',
	styleUrl: './entrenamientos.component.css'
})

export class EntrenamientosComponent {
	@ViewChild(AppModalComponent) appModalComponent!: AppModalComponent
	
	paginatedList!: IPagination<IEntrenamientoList>;
	tableColumns: ITableColumn[] = [
		{ field: "name", header: "Nombre", widthPercentage: 20 },
		{ field: "description", header: "Descripción", widthPercentage: 50 },
		{ field: "creationDate", header: "Fecha de creación", widthPercentage: 20 }
	];
	isLoading: boolean = false;
	entrenamientoToDelete?: string;

	alertType: string = "";
	alertMessage: string = "";
	showAlert: boolean = false;

	private _apiService = inject(ApiService)
	private _router = inject(Router)

	ngOnInit() {
		this.isLoading = true;
		this._apiService.getAll("entrenamientos/pagination").subscribe(
			result => {
				this.paginatedList = result;
				this.isLoading = false;
			},
			error => {
				this.isLoading = false;
				this.showAlert = true;
				this.alertType = "danger";
				this.alertMessage = `No se han podido cargar los entrenamientos. ${error.message}`
			}
		)
	}
	
	goToEntrenamientoDetails(id: string): void {
		this._router.navigate([`/entrenamientos/${id}`])
	}

	deleteEntrenamiento(id: string): void {
		this.entrenamientoToDelete = id;
		this.appModalComponent.openModal();		
	}

	confirmDeleteEntrenamiento() {
		this._apiService.delete("entrenamientos", this.entrenamientoToDelete!)
			.subscribe(
				() => { 
					this.showAlert = false;
					window.location.reload();
				},
				error => { 
					this.showAlertMessage("danger", error.message);
				}
			);
	}

	setPage(page: number) {
		this.isLoading = true;
		this._apiService.getAll("entrenamientos/pagination", page)
			.pipe(
				finalize(() => { this.isLoading = false; })
			)
			.subscribe(
				(result) => {
					this.paginatedList = result;
				},
				(error) => {
					this.showAlertMessage("danger", error.message);
				}
		);
	}
	
	showAlertMessage(type: string, message: string) {
		this.showAlert = true;
		this.alertType = type;
		this.alertMessage = message;
	}
}
