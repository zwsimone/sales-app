import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
	selector: 'app-add-sale',
	templateUrl: './add-sale.page.html',
	styleUrls: ['./add-sale.page.scss'],
})
export class AddSalePage implements OnInit {
	formType: string;
	saleForm: FormGroup;

	paymentMethods = [
		{ value: 'cash', label: 'Cash' },
		{ value: 'card', label: 'Card' },
		{ value: 'eft', label: 'EFT' }
	];

	servers = [
		'Carly',
		'Amy',
		'Samantha',
		'Sophia',
		'Zoe'
	];

	constructor(public formBuilder: FormBuilder) {
		this.formType = 'delivery';
	}

	get tableNumber() {
		return this.saleForm.get('tableNumber');
	}

	get mobile() {
		return this.saleForm.get('mobile');
	}

	get deliveryFee() {
		return this.saleForm.get('deliveryFee');
	}

	ngOnInit() {
		this.saleForm = this.formBuilder.group({
			invoiceNumber: ['', [Validators.required]],
			tableNumber: ['', [this.tableFieldRequiredValidator(this.formType)]],
			mobile: ['', [this.deliveryFieldRequiredValidator(this.formType)]],
			orderTotal: ['', [Validators.required]],
			paymentMethod: ['', [Validators.required]],
			paymentTotal: ['', [Validators.required]],
			deliveryFee: ['', [this.deliveryFieldRequiredValidator(this.formType)]],
			serverName: ['', [Validators.required]],
		});
	}

	clearForm(): void {
		this.saleForm.reset();
	}

	submitForm(): void {
		console.log(this.saleForm.value);
		this.clearForm();
	}

	tableFieldRequiredValidator(saleType: string): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			if (saleType === 'table') {
				return control.value === '' ? { required: true } : null;
			} else {
				return null;
			}
		};
	}

	deliveryFieldRequiredValidator(saleType: string): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			if (saleType === 'delivery') {
				return control.value === '' ? {required: true } : null;
			} else {
				return null;
			}
		};
	}
}
