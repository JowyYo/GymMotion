import { CommonModule, KeyValue } from '@angular/common';
import { Component, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searcheable-selector',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './searcheable-selector.component.html',
  styleUrl: './searcheable-selector.component.css'
})

export class SearcheableSelectorComponent {

	@Input({required: true}) options: KeyValue<number | string, string>[] = [];
	@Input() selectedOptionKey: number | string | undefined;
	@Input() inputClass: string = '';
	@Output() optionChange = new EventEmitter<string | number>();

	searchText: string = '';
	filteredOptions: KeyValue<number | string, string>[] = [];
	selectedOption: KeyValue<number | string, string> | null = null;
	dropdownVisible: boolean = false;

	constructor(private elRef: ElementRef, private renderer: Renderer2) {}

	ngOnInit() {
		this.filteredOptions = [...this.options];

		if(this.selectedOptionKey != null) {
			this.selectOption(this.options.find(o => o.key == this.selectedOptionKey)!);
		}

		this.renderer.listen('document', 'click', (event: Event) => {
			if (!this.elRef.nativeElement.contains(event.target)) {
			  this.hideDropdown();
			}
		});
	}

	searchOptions() {
		const lowerCasesearch = this.searchText.toLowerCase();
		this.filteredOptions = this.options.filter((option: KeyValue<number | string, string>) =>
			option.value.toLowerCase().includes(lowerCasesearch)
		);
	}

	selectOption(option: KeyValue<number | string, string>) {
		this.selectedOption = option;
		this.searchText = option.value;
		this.dropdownVisible = false;
		this.optionChange.emit(option.key);
	}

	showDropdown() {
		this.searchText = "";
		this.filteredOptions = [...this.options];
		this.dropdownVisible = true;
	}

	hideDropdown() {
		if (this.selectedOption != null)
			this.searchText = this.selectedOption.value;
		this.dropdownVisible = false;
	}
}
