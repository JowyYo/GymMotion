import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IEjercicio } from '../models/ejercicio.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjercicioApiService {
  
	baseUrl: string = "http://localhost:5055/api/ejercicios";
	private _http = inject(HttpClient);
	
	getAll(): Observable<IEjercicio[]> {
		return this._http.get<IEjercicio[]>(this.baseUrl);
	}
}
