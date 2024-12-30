import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { ApiService } from '../../services/api.service';
import { finalize, Subject, takeUntil, tap } from 'rxjs';
import { PageLoadingComponent } from '../../components/page-loading/page-loading.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, PageLoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
	loginForm: FormGroup;
	errorMessage: string = '';
	isLoading: boolean = false
	private destroy$ = new Subject<void>();

	_sharedService = inject(SharedService);
	private _apiService = inject(ApiService);
  
	constructor(private formBuilder: FormBuilder) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
  
	onSubmit() {		
		if (this.loginForm.valid) {
			this.isLoading = true;
			
			this._apiService.post('login', this.loginForm.value)
				.pipe(
					takeUntil(this.destroy$),
					finalize(() => this.isLoading = false)
				)
				.subscribe(
					success => {
						this._sharedService.goToPath('home');
					},
					error => {
						this.errorMessage = 'Credenciales inválidas. Por favor, intente de nuevo.';
					}
				)
		} else {
			this._sharedService.markFormFieldsAsTouched(this.loginForm);
		}
	}
}
