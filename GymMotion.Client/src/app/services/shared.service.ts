import { inject, Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

	private _router = inject(Router)

	hasErrors(form: FormGroup, field: string, typeError: string) {
		return form.get(field)?.hasError(typeError) && form.get(field)?.touched;
	}

	markFormFieldsAsTouched(form: FormGroup) {
		Object.keys(form.controls).forEach(field => {
			const control = form.get(field);
			if (control) {
				if (control instanceof FormArray) {
					control.controls.forEach(arrayControl => {
						this.markFormFieldsAsTouched(arrayControl as FormGroup);
					});
				} else {
					control.markAsTouched();
				}
			}
		});
	}

	goToPath(path: string) {
		this._router.navigate([path]);
	}
}
