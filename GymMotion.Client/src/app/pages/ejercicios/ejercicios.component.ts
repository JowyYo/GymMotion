import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITableColumn } from '../../models/table-column.model';
import { AppTableComponent } from '../../components/app-table/app-table.component';
import { IEjercicio } from '../../models/ejercicio.model';
import { Router, RouterModule } from '@angular/router';
import { EjercicioApiService } from '../../services/ejercicio-api.service';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ejercicios',
  imports: [ CommonModule, AppTableComponent, RouterModule, HttpClientModule ],
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

	private _router = inject(Router);
	private _apiService = inject(EjercicioApiService);

	ngOnInit() {
		this.apiSuscription = this._apiService.getAll().subscribe(
			(result) => {
				this.ejerciciosList = result;
			},
			(error) => {
				console.log(error)
			}
		);
	}

	ngOnDestroy(): void {
		if (this.apiSuscription)
			this.apiSuscription.unsubscribe();
	}
	
	goToEjercicioDetails(id: number): void {
		this._router.navigate([`/ejercicios/${id}`])
	}
}