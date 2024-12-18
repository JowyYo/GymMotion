import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IEjercicio } from '../models/ejercicio.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-ejercicio-details',
	imports: [],
	templateUrl: './ejercicio-details.component.html',
	styleUrl: './ejercicio-details.component.css'
})

export class EjercicioDetailsComponent implements OnInit, OnDestroy {	
	ejercicioDetails?: IEjercicio;
	paramsSubscription: Subscription = new Subscription(); 
	private _activatedRouter = inject(ActivatedRoute);

	ngOnInit(): void {
		this.paramsSubscription = this._activatedRouter.params.subscribe(
			params => {
				const ejercicioId = params['ejercicioId'];

				if (ejercicioId !== "new")
					console.log("Obtener los datos del detalle del ejercicio a actualizar")
				else
					console.log("Nuevo ejercicio")
			}
		)
	}
	
	ngOnDestroy(): void {
		if (this.paramsSubscription)
			this.paramsSubscription.unsubscribe();
	}
}
