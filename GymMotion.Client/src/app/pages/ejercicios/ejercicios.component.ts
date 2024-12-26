import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITableColumn } from '../../models/table-column.model';
import { AppTableComponent } from '../../components/app-table/app-table.component';
import { IEjercicio } from '../../models/ejercicio.model';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { PageLoadingComponent } from '../../components/page-loading/page-loading.component';
import { AppModalComponent } from '../../components/app-modal/app-modal.component';
import { AppAlertComponent } from '../../components/app-alert/app-alert.component';
import { IPagination } from '../../models/pagination.model';
import { AppPaginationComponent } from '../../components/app-pagination/app-pagination.component';
import { SharedService } from '../../services/shared.service';

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
	isLoading: boolean = false;
	ejercicioToDelete?: string;
	
	alertType: string = "";
	alertMessage: string = "";
	showAlert: boolean = false;

	private destroy$ = new Subject<void>();
	private _apiService = inject(ApiService);
	private _sharedService = inject(SharedService);

	ngOnInit() {
		this.isLoading = true;
		this._apiService.getAll("ejercicios/pagination").pipe(takeUntil(this.destroy$)).subscribe(
			(result) => {
				this.paginatedList = result;
				this.isLoading = false;
			},
			(error) => {
				this.showAlertMessage("danger", error.message);
				this.isLoading = false;
			}
		);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
	
	goToEjercicioDetails(id: string): void {
		this._sharedService.goToPath(`/ejercicios/${id}`)
	}

	deleteEjercicio(id: string) {
		this.ejercicioToDelete = id;
		this.appModalComponent.openModal();
	}

	confirmDeleteEjercicio() {
		this._apiService.delete("ejercicios", this.ejercicioToDelete!)
			.pipe(takeUntil(this.destroy$))
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
				takeUntil(this.destroy$),
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