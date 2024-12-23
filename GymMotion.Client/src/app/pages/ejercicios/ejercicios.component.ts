import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITableColumn } from '../../models/table-column.model';
import { AppTableComponent } from '../../components/app-table/app-table.component';
import { IEjercicio } from '../../models/ejercicio.model';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { PageLoadingComponent } from '../../components/page-loading/page-loading.component';

@Component({
  selector: 'app-ejercicios',
  imports: [ CommonModule, AppTableComponent, RouterModule, PageLoadingComponent ],
  templateUrl: './ejercicios.component.html',
  styleUrl: './ejercicios.component.css'
})

export class EjerciciosComponent implements OnInit, OnDestroy {

	ejerciciosList: IEjercicio[] = []
	tableColumns: ITableColumn[] = [
		{ field: "name", header: "Name" },
		{ field: "description", header: "Description" },
		{ field: "group", header: "Group" },
	]
	apiSuscription?: Subscription;
	isLoading: boolean = false;

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
		
	}
}