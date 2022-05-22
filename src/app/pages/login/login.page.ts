import { Component, OnInit } from "@angular/core";
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { AuthService } from "src/app/service/auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.page.html",
	styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
	credentials: FormGroup;

	constructor(
		private fb: FormBuilder,
		private alertController: AlertController,
		private loadingController: LoadingController,
		private authService: AuthService,
		private router: Router
	) {}

	get email(): AbstractControl {
		return this.credentials.get("email");
	}

	get password(): AbstractControl {
		return this.credentials.get("password");
	}

	ngOnInit() {
		this.credentials = this.fb.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]],
		});
	}

	async login() {
		const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.login(this.credentials.value);
		await loading.dismiss();

		if (user) {
			this.router.navigateByUrl("/view-sales", { replaceUrl: true });
		} else {
			this.showAlert("Login failed", "Please try again");
		}
	}

	async showAlert(header, message) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ["OK"],
		});
		await alert.present();
	}
}
