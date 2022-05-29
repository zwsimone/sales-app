import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
	AlertController,
	LoadingController,
	ModalController,
} from "@ionic/angular";
import { combineLatest, forkJoin, tap } from "rxjs";
import { Subscription } from "rxjs/internal/Subscription";
import { AuthService } from "src/app/service/auth.service";
import { HistoryService } from "src/app/service/history.service";
import { SalesService } from "src/app/service/sales.service";
import { EmployeesComponent } from "src/app/shared/modal/employees/employees.component";
import { Sales } from "src/app/shared/model/sale";
import { version } from "src/version";

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
		private router: Router,
		private loadingController: LoadingController
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

	async aboutInfo() {
		const aboutAlert = await this.alertController.create({
			header: "About",
			message: `Wok Sales App v${version}`,
			buttons: ["OK"],
		});
		await aboutAlert.present();
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
					handler: async () => {
						const resetLoading =
							await this.loadingController.create();
						await resetLoading.present();

						this.copySalesToHistory();

						await resetLoading.dismiss();

						const completeAlert = await this.alertController.create(
							{
								header: "Action Complete",
								message: "Reset daily sales complete.",
								buttons: ["OK"],
							}
						);
						await completeAlert.present();
					},
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
