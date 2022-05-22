import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { combineLatest, forkJoin, tap } from "rxjs";
import { Subscription } from "rxjs/internal/Subscription";
import { AuthService } from "src/app/service/auth.service";
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
		public alertController: AlertController,
		private authService: AuthService,
		private router: Router
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

	async logout() {
		await this.authService.logout();
		this.router.navigateByUrl("/", { replaceUrl: true });
	}
}
