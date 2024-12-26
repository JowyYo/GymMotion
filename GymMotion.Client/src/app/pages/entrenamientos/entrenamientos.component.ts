import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ITableColumn } from '../../models/table-column.model';
import { IEntrenamientoList } from '../../models/entrenamiento-list.model';
import { AppTableComponent } from '../../components/app-table/app-table.component';
import { ApiService } from '../../services/api.service';
import { AppAlertComponent } from '../../components/app-alert/app-alert.component';
import { AppPaginationComponent } from '../../components/app-pagination/app-pagination.component';
import { AppModalComponent } from '../../components/app-modal/app-modal.component';
import { IPagination } from '../../models/pagination.model';
import { PageLoadingComponent } from '../../components/page-loading/page-loading.component';
import { finalize, Subject, takeUntil } from 'rxjs';
import { SharedService } from '../../services/shared.service';

@Component({
	selector: 'app-entrenamientos',
	imports: [ CommonModule, RouterModule, AppTableComponent, AppAlertComponent, AppPaginationComponent, AppModalComponent, PageLoadingComponent ],
	templateUrl: './entrenamientos.component.html',
	styleUrl: './entrenamientos.component.css'
})

export class EntrenamientosComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();

	@ViewChild(AppModalComponent) appModalComponent!: AppModalComponent
	
	paginatedList!: IPagination<IEntrenamientoList>;
	tableColumns: ITableColumn[] = [
		{ field: "name", header: "Nombre", widthPercentage: 20 },
		{ field: "description", header: "Descripción", widthPercentage: 50 },
		{ field: "createdDate", header: "Fecha de creación", widthPercentage: 20 }
	];
	isLoading: boolean = false;
	entrenamientoToDelete?: string;

	alertType: string = "";
	alertMessage: string = "";
	showAlert: boolean = false;

	private _apiService = inject(ApiService)
	_sharedService = inject(SharedService)

	ngOnInit() {
		this.isLoading = true;
		this._apiService.getAll("entrenamientos/pagination").pipe(takeUntil(this.destroy$)).subscribe(
			result => {
				this.paginatedList = result;
				this.isLoading = false;
			},
			error => {
				this.showAlertMessage("danger", `No se han podido cargar los entrenamientos. ${error.message}`);
				this.isLoading = false;
			}
		)
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
	
	goToEntrenamientoDetails(id: string): void {
		this._sharedService.goToPath(`/entrenamientos/${id}`);
	}

	deleteEntrenamiento(id: string): void {
		this.entrenamientoToDelete = id;
		this.appModalComponent.openModal();		
	}

	confirmDeleteEntrenamiento() {
		this._apiService.delete("entrenamientos", this.entrenamientoToDelete!)
			.pipe(takeUntil(this.destroy$))
			.subscribe(
				() => { 
					this.showAlert = false;
					window.location.reload();
				},
				error => { 
					this.showAlertMessage("danger", error.error);
				}
			);
	}

	setPage(page: number) {
		this.isLoading = true;
		this._apiService.getAll("entrenamientos/pagination", page)
			.pipe(
				takeUntil(this.destroy$),
				finalize(() => { this.isLoading = false; })
			)
			.subscribe(
				(result) => {
					this.paginatedList = result;
				},
				(error) => {
					this.showAlertMessage("danger", error.error);
				}
		);
	}
	
	showAlertMessage(type: string, message: string) {
		this.showAlert = true;
		this.alertType = type;
		this.alertMessage = message;
	}
}
