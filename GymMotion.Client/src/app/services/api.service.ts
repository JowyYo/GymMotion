import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  	providedIn: 'root'
})
export class ApiService {

	private _httpClient = inject(HttpClient);
	baseUrl: string = "";

  	constructor() { }
}
