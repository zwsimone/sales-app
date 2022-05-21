import { SalesService } from "src/app/service/sales.service";

import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";

import { Sale } from "../../model/sale";
import { SaleValidator } from "./sale-modal.validator";
import { EmployeesService, IEmployee } from "src/app/service/employees.service";
import { Subscription } from "rxjs/internal/Subscription";

@Component({
	selector: "app-sale-modal",
	templateUrl: "./sale-modal.component.html",
	styleUrls: ["./sale-modal.component.scss"],
})
export class SaleModalComponent implements OnInit, OnDestroy {
	@Input() saleID: string;
	@Input() mode: string;

	formType: string;
	saleForm: FormGroup;

	paymentMethods = [
		{ value: "cash", label: "Cash" },
		{ value: "card", label: "Card" },
		{ value: "eft", label: "EFT" },
	];

	servers: IEmployee[];

	sale: Sale;

	saleSubscriptions: Subscription[];

	constructor(
		protected modalController: ModalController,
		public formBuilder: FormBuilder,
		protected dataService: SalesService,
		private saleValidator: SaleValidator,
		private employeesService: EmployeesService
	) {
		this.sale = new Sale();
		this.saleSubscriptions = new Array<Subscription>();
	}

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
		this.saleForm = this.formBuilder.group({
			invoiceNumber: ["", [Validators.required]],
			tableNumber: [
				"",
				[this.saleValidator.tableFieldRequiredValidator(this.formType)],
			],
			mobile: [
				"",
				[
					this.saleValidator.deliveryFieldRequiredValidator(
						this.formType
					),
				],
			],
			orderTotal: ["", [Validators.required]],
			paymentMethod: ["", [Validators.required]],
			paymentTotal: ["", [Validators.required]],
			deliveryFee: [
				"",
				[
					this.saleValidator.deliveryFieldRequiredValidator(
						this.formType
					),
				],
			],
			serverName: ["", [Validators.required]],
		});

		this.saleSubscriptions.push(
			this.employeesService.employees.subscribe(
				(employeeNames) => (this.servers = employeeNames)
			)
		);

		if (this.mode === "update") {
			this.saleSubscriptions.push(
				this.dataService.getSale(this.saleID).subscribe((res) => {
					this.sale.data = res;
					this.setForm();
					console.log(this.sale.data);
				})
			);
		} else {
			this.setForm();
		}
	}

	ngOnDestroy(): void {
		this.saleSubscriptions.forEach((subscription) =>
			subscription.unsubscribe()
		);
	}

	setForm(): void {
		if (this.mode === "update") {
			this.formType = this.sale.saleType;
			this.invoiceNumber.setValue(this.sale.data.invoiceNumber, {
				emitModelToViewChange: true,
			});
			this.orderTotal.setValue(this.sale.data.orderTotal, {
				emitModelToViewChange: true,
			});
			this.paymentMethod.setValue(this.sale.data.paymentMethod, {
				emitModelToViewChange: true,
			});
			this.paymentTotal.setValue(this.sale.data.paymentTotal, {
				emitModelToViewChange: true,
			});
			this.serverName.setValue(this.sale.data.serverName, {
				emitModelToViewChange: true,
			});
			if (this.formType === "table") {
				console.log("Setting update table form");
				this.tableNumber.setValue(this.sale.data.tableNumber, {
					emitModelToViewChange: true,
				});
			} else if (this.formType === "delivery") {
				console.log("Setting update delivery form");
				this.mobile.setValue(this.sale.data.mobile, {
					emitModelToViewChange: true,
				});
				this.deliveryFee.setValue(this.sale.data.deliveryFee, {
					emitModelToViewChange: true,
				});
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
