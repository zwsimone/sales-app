import { Component } from "@angular/core";
@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"],
})
export class AppComponent {
	public appPages = [
		{ title: "Daily Sales", url: "/view-sales" },
		{ title: "Daily Summary", url: "/sales-summary" },
		{ title: "Sales History", url: "/sales-history" },
		{ title: "Settings", url: "/settings" },
	];

	constructor() {}
}
