import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [ CommonModule ],
  templateUrl: './app-modal.component.html',
  styleUrl: './app-modal.component.css'
})
export class AppModalComponent {
	@ViewChild('appModal') appModal!: ElementRef 

	@Input() title?: string;
	@Input({required: true}) text!: string;

	@Output() onConfirmModal = new EventEmitter<void>();
	
	openModal() {
		this.appModal.nativeElement.style.display = "block"
	}

	closeModal() {
		this.appModal.nativeElement.style.display = "none"
	}

	confirmModal() {
		this.onConfirmModal.emit();
		this.closeModal();
	}
}
