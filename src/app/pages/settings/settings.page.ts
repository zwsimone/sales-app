import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { EmployeesComponent } from "src/app/shared/modal/employees/employees.component";

@Component({
	selector: "app-settings",
	templateUrl: "./settings.page.html",
	styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
	constructor(public modalController: ModalController) {}

	ngOnInit() {}

	async employeeModal() {
		const modal = await this.modalController.create({
			component: EmployeesComponent,
		});
		await modal.present();
	}
}
