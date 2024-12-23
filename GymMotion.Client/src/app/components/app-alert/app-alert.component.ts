import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [ CommonModule ],
  templateUrl: './app-alert.component.html',
  styleUrl: './app-alert.component.css'
})
export class AppAlertComponent {

	@Input({required: true}) alertType!: string;
	@Input({required: true}) message!: string;

	@Output() onCloseAlert = new EventEmitter<void>();

	closeAlert() {
		this.onCloseAlert.emit()
	}
}
