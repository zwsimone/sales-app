import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Sales } from 'src/app/shared/model/sale';

@Component({
	selector: 'app-sales-summary',
	templateUrl: './sales-summary.page.html',
	styleUrls: ['./sales-summary.page.scss'],
})
export class SalesSummaryPage implements OnInit {
	sales: Sales;
	servers: string[];

	constructor(private dataService: DataService) {
		this.sales = new Sales();
		this.servers = new Array<string>();
	}

	ngOnInit() {
		this.dataService.getSales().subscribe(data => {
			this.sales.list = data;
			this.servers = this.sales.getServers();
		});
	}
}
