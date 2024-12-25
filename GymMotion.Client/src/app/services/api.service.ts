import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
	baseUrl: string = "http://localhost:5055/api";
	headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	
	private _http = inject(HttpClient);
	
	getAll(path: string, page?: number): Observable<any> {
		return this._http.get(`${this.baseUrl}/${path}${page ? "?page=" + page : ""}`);
	}

	getById(path: string, id: string): Observable<any> {
		return this._http.get(`${this.baseUrl}/${path}/${id}`);
	}

	create(path: string, entity: any): Observable<any> {
		console.log(entity)
		return this._http.post(`${this.baseUrl}/${path}`, entity);
	}
	
	update(path: string, id: string, entity: any): Observable<any> {
		return this._http.put(`${this.baseUrl}/${path}/${id}`, entity);
	}

	delete(path: string, id: string): Observable<any> {
		return this._http.delete(`${this.baseUrl}/${path}/${id}`);
	}
}
