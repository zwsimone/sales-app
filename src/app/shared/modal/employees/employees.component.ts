import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { EmployeesService, IEmployee } from "src/app/service/employees.service";

@Component({
	selector: "app-employees",
	templateUrl: "./employees.component.html",
	styleUrls: ["./employees.component.scss"],
})
export class EmployeesComponent implements OnInit {
	servers: IEmployee[];
	isLoading: boolean;

	constructor(
		protected modalController: ModalController,
		private employeesService: EmployeesService,
		public alertController: AlertController
	) {
		this.isLoading = true;
	}

	ngOnInit() {
		this.employeesService.employees.subscribe((employees) => {
			this.servers = employees;
			this.servers.sort((employee1, employee2) => {
				if (employee1.name > employee2.name) return 1;
				if (employee1.name < employee2.name) return -1;
				return 0;
			});
			this.isLoading = false;
		});
	}

	dismiss() {
		this.modalController.dismiss();
	}

	async editEmployeeName(server: IEmployee) {
		const editAlert = await this.alertController.create({
			header: "Edit Employee Name",
			inputs: [
				{
					name: "employeeName",
					placeholder: server.name,
					type: "textarea",
				},
			],
			buttons: [
				{
					text: "Cancel",
					role: "cancel",
				},
				{
					text: "Save",
					handler: (input) => {
						const employee = {
							name: input.employeeName,
							id: server.id,
						} as IEmployee;
						console.log(employee);
						this.employeesService.updateEmployee(employee);
					},
				},
			],
		});
		await editAlert.present();
	}

	async deleteEmployee(server: IEmployee) {
		const confirmAlert = await this.alertController.create({
			header: "Delete Employee",
			message: `Are you sure you want to delete ${server.name}?`,
			buttons: [
				{
					text: "Cancel",
					role: "cancel",
				},
				{
					text: "Confirm",
					handler: () => this.employeesService.deleteEmployee(server),
				},
			],
		});
		await confirmAlert.present();
	}

	async addEmployee() {
		const addAlert = await this.alertController.create({
			header: "Add Employee",
			inputs: [
				{
					type: "text",
					name: "employeeName",
					placeholder: "Name",
				},
			],
			buttons: [
				{
					text: "Cancel",
					role: "cancel",
				},
				{
					text: "Add",
					handler: (input) => {
						const employee = {
							name: input.employeeName,
						};
						this.employeesService.addEmployee(employee);
					},
				},
			],
		});
		await addAlert.present();
	}
}
