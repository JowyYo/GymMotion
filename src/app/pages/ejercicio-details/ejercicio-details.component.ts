import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GrupoMuscular } from '../../models/ejercicio.model';
import { ActivatedRoute, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-ejercicio-details',
	imports: [ ReactiveFormsModule, CommonModule ],
	templateUrl: './ejercicio-details.component.html',
	styleUrl: './ejercicio-details.component.css'
})

export class EjercicioDetailsComponent implements OnInit, OnDestroy {

	ejercicioForm!: FormGroup;
	paramsSubscription: Subscription = new Subscription(); 
	gruposMuscular = Object.values(GrupoMuscular);

	private _activatedRouter = inject(ActivatedRoute);
	
	constructor(private formBuilder: FormBuilder) {
		this.ejercicioForm = this.formBuilder.group({
			name: ['', Validators.required],
			description: [''],
			group: ['', Validators.required]
		})
	}

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

	guardar() {
		console.log(this.ejercicioForm?.value)
	}

	hasErrors(field: string, typeError: string) {
		return this.ejercicioForm.get(field)?.hasError(typeError) && this.ejercicioForm.get(field)?.touched;
	}
}
