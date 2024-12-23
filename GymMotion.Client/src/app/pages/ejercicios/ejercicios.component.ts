import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITableColumn } from '../../models/table-column.model';
import { AppTableComponent } from '../../components/app-table/app-table.component';
import { IEjercicio } from '../../models/ejercicio.model';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { PageLoadingComponent } from '../../components/page-loading/page-loading.component';
import { AppModalComponent } from '../../components/app-modal/app-modal.component';
import { AppAlertComponent } from '../../components/app-alert/app-alert.component';

@Component({
  selector: 'app-ejercicios',
  imports: [ CommonModule, AppTableComponent, RouterModule, PageLoadingComponent, AppModalComponent, AppAlertComponent ],
  templateUrl: './ejercicios.component.html',
  styleUrl: './ejercicios.component.css'
})

export class EjerciciosComponent implements OnInit, OnDestroy {
	@ViewChild(AppModalComponent) appModalComponent!: AppModalComponent

	ejerciciosList: IEjercicio[] = []
	tableColumns: ITableColumn[] = [
		{ field: "name", header: "Name" },
		{ field: "description", header: "Description" },
		{ field: "group", header: "Group" },
	]
	apiSuscription?: Subscription;
	isLoading: boolean = false;
	ejercicioToDelete?: string;
	alertType: string = "success";
	alertMessage: string = "Se ha guardado correctamente";
	showAlert: boolean = false;

	private _router = inject(Router);
	private _apiService = inject(ApiService);

	ngOnInit() {
		this.isLoading = true;
		this.apiSuscription = this._apiService.getAll("ejercicios").subscribe(
			(result) => {
				this.ejerciciosList = result;
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
		console.log("confirmar eliminar ejercicio")
		this._apiService.delete("ejercicios", this.ejercicioToDelete!)
			.subscribe(
				() => { 
					window.location.reload();
				},
				error => { 
					this.showAlert = true;
					this.alertType = "danger";
					this.alertMessage = error.message;
				}
			);
	}
}