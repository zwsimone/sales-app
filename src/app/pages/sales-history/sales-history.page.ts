import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { SalesService } from "src/app/service/sales.service";
import { Sales } from "src/app/shared/model/sale";

@Component({
	selector: "app-sales-history",
	templateUrl: "./sales-history.page.html",
	styleUrls: ["./sales-history.page.scss"],
})
export class SalesHistoryPage implements OnInit {
	history: Sales;
	private subscriptions: Subscription[];

	constructor(private salesService: SalesService) {
		this.subscriptions = new Array<Subscription>();
		this.history = new Sales();
	}

	ngOnInit() {
		this.subscriptions.push(
			this.salesService
				.getTop100Sales()
				.subscribe((sales) => (this.history.list = sales))
		);
	}
}
