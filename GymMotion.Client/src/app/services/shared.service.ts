import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

	hasErrors(form: FormGroup, field: string, typeError: string) {
		return form.get(field)?.hasError(typeError) && form.get(field)?.touched;
	}

	markFormFieldsAsTouched(form: FormGroup) {
		Object.keys(form.controls).forEach(field => {
			const control = form.get(field);
			if (control) {
			  control.markAsTouched();
			}
		});
	}
}
