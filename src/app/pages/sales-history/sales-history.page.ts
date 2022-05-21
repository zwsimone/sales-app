import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { HistoryService } from "src/app/service/history.service";
import { Sales } from "src/app/shared/model/sale";

@Component({
	selector: "app-sales-history",
	templateUrl: "./sales-history.page.html",
	styleUrls: ["./sales-history.page.scss"],
})
export class SalesHistoryPage implements OnInit {
	history: Sales;
	private subscriptions: Subscription[];

	constructor(private historyService: HistoryService) {
		this.subscriptions = new Array<Subscription>();
		this.history = new Sales();
	}

	ngOnInit() {
		this.subscriptions.push(
			this.historyService
				.getHistory()
				.subscribe((sales) => (this.history.list = sales))
		);
	}
}
