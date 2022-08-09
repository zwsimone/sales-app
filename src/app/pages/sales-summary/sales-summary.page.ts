import { Component, OnInit } from "@angular/core";
import { SalesService } from "src/app/service/sales.service";
import { Sales } from "src/app/shared/model/sale";

@Component({
	selector: "app-sales-summary",
	templateUrl: "./sales-summary.page.html",
	styleUrls: ["./sales-summary.page.scss"],
})
export class SalesSummaryPage implements OnInit {
	sales: Sales;
	servers: string[];

	constructor(private dataService: SalesService) {
		this.sales = new Sales();
		this.servers = new Array<string>();
	}

	ngOnInit() {
		this.dataService.getTodaysSales().subscribe((data) => {
			this.sales.list = data;
			this.servers = this.sales.getServers();
		});
	}
}
