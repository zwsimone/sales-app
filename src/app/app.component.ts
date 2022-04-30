import { Component } from '@angular/core';
@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	public appPages = [
		{ title: 'Add Sales', url: '/add-sale' },
		{ title: 'View Sales', url: '/view-sales' },
		{ title: 'Sales Summary', url: '/sales-summary' },
		{ title: 'Sales History', url: '/sales-history' },
	];

	constructor() {}
}
