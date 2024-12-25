import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITableColumn } from '../../models/table-column.model';
import { AppTableComponent } from '../../components/app-table/app-table.component';
import { IEjercicio } from '../../models/ejercicio.model';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { finalize, Subscription } from 'rxjs';
import { PageLoadingComponent } from '../../components/page-loading/page-loading.component';
import { AppModalComponent } from '../../components/app-modal/app-modal.component';
import { AppAlertComponent } from '../../components/app-alert/app-alert.component';
import { IPagination } from '../../models/pagination.model';
import { AppPaginationComponent } from '../../components/app-pagination/app-pagination.component';

@Component({
  selector: 'app-ejercicios',
  imports: [ CommonModule, AppTableComponent, RouterModule, PageLoadingComponent, AppModalComponent, AppAlertComponent, AppPaginationComponent ],
  templateUrl: './ejercicios.component.html',
  styleUrl: './ejercicios.component.css'
})

export class EjerciciosComponent implements OnInit, OnDestroy {
	@ViewChild(AppModalComponent) appModalComponent!: AppModalComponent

	paginatedList!: IPagination<IEjercicio>;
	tableColumns: ITableColumn[] = [
		{ field: "name", header: "Nombre", widthPercentage: 20 },
		{ field: "description", header: "Descripción", widthPercentage: 50 },
		{ field: "group", header: "Grupo muscular", widthPercentage: 20 },
	]
	apiSuscription?: Subscription;
	isLoading: boolean = false;
	ejercicioToDelete?: string;
	
	alertType: string = "";
	alertMessage: string = "";
	showAlert: boolean = false;

	private _router = inject(Router);
	private _apiService = inject(ApiService);

	ngOnInit() {
		this.isLoading = true;
		this.apiSuscription = this._apiService.getAll("ejercicios/pagination").subscribe(
			(result) => {
				this.paginatedList = result;
				this.isLoading = false;
			},
			(error) => {
				console.log(error)
				this.isLoading = false;
			}
		);
	}

	ngOnDestroy(): void {
		if (this.apiSuscription)
			this.apiSuscription.unsubscribe();
	}
	
	goToEjercicioDetails(id: string): void {
		this._router.navigate([`/ejercicios/${id}`])
	}

	deleteEjercicio(id: string) {
		this.ejercicioToDelete = id;
		this.appModalComponent.openModal();
	}

	confirmDeleteEjercicio() {
		this._apiService.delete("ejercicios", this.ejercicioToDelete!)
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
		this._apiService.getAll("ejercicios/pagination", page)
			.pipe(
				finalize(()  => { this.isLoading = true; })
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