import { Component, OnDestroy, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { combineLatest, concat, forkJoin, from, tap } from "rxjs";
import { Subscription } from "rxjs/internal/Subscription";
import { HistoryService } from "src/app/service/history.service";
import { SalesService } from "src/app/service/sales.service";
import { EmployeesComponent } from "src/app/shared/modal/employees/employees.component";
import { Sales } from "src/app/shared/model/sale";

@Component({
	selector: "app-settings",
	templateUrl: "./settings.page.html",
	styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit, OnDestroy {
	isLoading: boolean;
	private subscriptions: Subscription[];
	private sales: Sales;

	constructor(
		public modalController: ModalController,
		private salesService: SalesService,
		private historyService: HistoryService,
		public alertController: AlertController
	) {
		this.subscriptions = new Array<Subscription>();
		this.sales = new Sales();
		this.isLoading = true;
	}

	ngOnInit() {
		this.subscriptions.push(
			this.salesService.getSales().subscribe((salesList) => {
				this.sales.list = salesList;
				this.isLoading = false;
			})
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) =>
			subscription.unsubscribe()
		);
	}

	async employeeModal() {
		const modal = await this.modalController.create({
			component: EmployeesComponent,
		});
		await modal.present();
	}

	async resetAlert() {
		const resetAlert = await this.alertController.create({
			header: "Reset Daily Sales",
			message: "Are you sure you want to reset daily sales?",
			buttons: [
				{
					text: "Cancel",
					role: "cancel",
				},
				{
					text: "Confirm",
					handler: () => this.copySalesToHistory(),
				},
			],
		});
		await resetAlert.present();
	}

	copySalesToHistory(): void {
		const copyToHistory$ = forkJoin([
			this.sales.list.map((sale) =>
				this.historyService.addHistoryRecord(sale)
			),
		]);

		const deleteAllSales$ = forkJoin([
			this.sales.list.map((sale) => this.salesService.deleteSale(sale)),
		]);
		// const copyToHistory$ = from(
		// 	salesList$.forEach((sales) =>
		// 		sales.forEach((sale) =>
		// 			this.historyService.addHistoryRecord(sale)
		// 		)
		// 	)
		// ).pipe(concatAll());
		// const deleteAllSales$ = from(
		// 	salesList$.forEach((sales) =>
		// 		sales.forEach((sale) => this.salesService.deleteSale(sale))
		// 	)
		// ).pipe(concatAll());

		// const combined$ = concat(salesList$, copyToHistory$, deleteAllSales$);

		this.subscriptions.push(
			combineLatest([
				copyToHistory$.pipe(
					tap(() => console.log("Copied all records to history."))
				),
				deleteAllSales$.pipe(
					tap(() => console.log("Deleted all sales."))
				),
			]).subscribe()
		);
	}
}
