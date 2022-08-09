import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { AuthService } from "src/app/service/auth.service";
import { EmployeesComponent } from "src/app/shared/modal/employees/employees.component";
import { version } from "src/version";

@Component({
	selector: "app-settings",
	templateUrl: "./settings.page.html",
	styleUrls: ["./settings.page.scss"],
})
export class SettingsPage {
	constructor(
		public modalController: ModalController,
		public alertController: AlertController,
		private authService: AuthService,
		private router: Router
	) {}

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

	async logout() {
		await this.authService.logout();
		this.router.navigateByUrl("/", { replaceUrl: true });
	}
}
