import { DataService } from 'src/app/service/data.service';

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { Sale } from '../../model/sale';
import { SaleValidator } from './sale-modal.validator';

@Component({
	selector: "app-sale-modal",
	templateUrl: "./sale-modal.component.html",
	styleUrls: ["./sale-modal.component.scss"],
})
export class SaleModalComponent implements OnInit {
	@Input() saleID: string;
	@Input() mode: string;

	formType: string;
	saleForm: FormGroup;

	paymentMethods = [
		{ value: "cash", label: "Cash" },
		{ value: "card", label: "Card" },
		{ value: "eft", label: "EFT" },
	];

	servers = ["Carly", "Amy", "Samantha", "Sophia", "Zoe"];

	sale: Sale;

	constructor(protected modalController: ModalController, public formBuilder: FormBuilder, protected dataService: DataService, private saleValidator: SaleValidator) { }

	get invoiceNumber() {
		return this.saleForm.get("invoiceNumber");
	}

	get tableNumber() {
		return this.saleForm.get("tableNumber");
	}

	get mobile() {
		return this.saleForm.get("mobile");
	}

	get orderTotal() {
		return this.saleForm.get("orderTotal");
	}

	get paymentMethod() {
		return this.saleForm.get("paymentMethod");
	}

	get paymentTotal() {
		return this.saleForm.get("paymentTotal");
	}

	get deliveryFee() {
		return this.saleForm.get("deliveryFee");
	}

	get serverName() {
		return this.saleForm.get("serverName");
	}

	ngOnInit() {
		this.sale = new Sale();
		if (this.mode === "update") {
			this.dataService.getSale(this.saleID).subscribe(res => {
				this.sale.data = res;
				this.setForm();
			});
		}
		this.saleForm = this.formBuilder.group({
			invoiceNumber: ["", [Validators.required]],
			tableNumber: ["", [this.saleValidator.tableFieldRequiredValidator(this.formType)]],
			mobile: ["", [this.saleValidator.deliveryFieldRequiredValidator(this.formType)]],
			orderTotal: ["", [Validators.required]],
			paymentMethod: ["", [Validators.required]],
			paymentTotal: ["", [Validators.required]],
			deliveryFee: ["", [this.saleValidator.deliveryFieldRequiredValidator(this.formType)]],
			serverName: ["", [Validators.required]],
		});
		this.setForm();
	}

	setForm(): void {
		if (this.mode === "update") {
			this.formType = this.sale.saleType;
			this.invoiceNumber.setValue(this.sale.data.invoiceNumber);
			this.orderTotal.setValue(this.sale.data.orderTotal);
			this.paymentMethod.setValue(this.sale.data.paymentMethod);
			this.paymentTotal.setValue(this.sale.data.paymentTotal);
			this.serverName.setValue(this.sale.data.serverName);
			if (this.formType === "table") {
				this.tableNumber.setValue(this.sale.data.tableNumber);
			} else if (this.formType === "delivery") {
				this.mobile.setValue(this.sale.data.mobile);
				this.deliveryFee.setValue(this.sale.data.deliveryFee);
			}
		} else {
			this.formType = "delivery";
		}
	}

	clearForm(): void {
		this.saleForm.reset();
	}

	submitForm(): void {
		this.sale.data.saleType = this.formType;
		this.sale.data.saleDate = Date.now();
		this.sale.data.invoiceNumber = this.invoiceNumber.value;
		this.sale.data.mobile = this.mobile.value;
		this.sale.data.orderTotal = this.orderTotal.value;
		this.sale.data.paymentMethod = this.paymentMethod.value;
		this.sale.data.paymentTotal = this.paymentTotal.value;
		this.sale.data.deliveryFee = this.deliveryFee.value;
		this.sale.data.serverName = this.serverName.value;


		if (this.mode === "update") this.dataService.updateSale(this.sale.data);
		else this.dataService.addSale(this.sale.data);

		this.clearForm();
		this.dismiss();
	}

	dismiss() {
		this.modalController.dismiss();
	}
}
