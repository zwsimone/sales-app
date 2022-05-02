import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/service/data.service';
import { EditSaleComponent } from 'src/app/shared/modal/edit-sale/edit-sale.component';

@Component({
	selector: 'app-view-sales',
	templateUrl: './view-sales.page.html',
	styleUrls: ['./view-sales.page.scss'],
})
export class ViewSalesPage implements OnInit {
	viewType: string;

	salesList: Sale[] = [
		{
			saleType: 'delivery',
			saleDate: new Date('2022-04-30'),
			invoiceNumber: 15,
			mobile: '0123456789',
			orderTotal: 123.50,
			paymentMethod: 'cash',
			paymentTotal: 150.00,
			deliveryFee: 15.00,
			serverName: 'Carly',
		},
		{
			saleType: 'table',
			saleDate: new Date('2022-04-30'),
			invoiceNumber: 20,
			tableNumber: 3,
			orderTotal: 250.00,
			paymentMethod: 'card',
			paymentTotal: 300.00,
			serverName: 'Samantha',
		},
		{
			saleType: 'table',
			saleDate: new Date('2022-04-30'),
			invoiceNumber: 1,
			tableNumber: 5,
			orderTotal: 475.00,
			paymentMethod: 'cash',
			paymentTotal: 525.00,
			serverName: 'Zoe',
		},
		{
			saleType: 'delivery',
			saleDate: new Date('2022-04-30'),
			invoiceNumber: 2,
			mobile: '0987654321',
			orderTotal: 421.50,
			paymentMethod: 'eft',
			paymentTotal: 421.50,
			deliveryFee: 30.00,
			serverName: 'Carly',
		},
		{
			saleType: 'delivery',
			saleDate: new Date('2022-04-30'),
			invoiceNumber: 31,
			mobile: '0564712389',
			orderTotal: 230.00,
			paymentMethod: 'cash',
			paymentTotal: 230.00,
			deliveryFee: 20.00,
			serverName: 'Lee',
		}
	];

	modal: HTMLElement;

	constructor(private dataService: DataService, public actionSheetController: ActionSheetController, public modalController: ModalController) {
		this.viewType = 'all';
		this.dataService.getSales().subscribe(data => {
			console.log(data);
		})
	}

	ngOnInit() { }

	async presentModal() {
		const modal = await this.modalController.create({
			component: EditSaleComponent,
			componentProps: {
				sale: this.salesList[0]
			}
		});
		await modal.present();
	}

	async handleEditButton() {
		const actionSheet = await this.actionSheetController.create({
			header: 'Options',
			buttons: [
				{
					text: 'Delete',
					role: 'destructive',
					icon: 'trash',
					handler: () => {
						console.log('Delete clicked');
					}
				},
				{
					text: 'Edit',
					icon: 'create-outline',
					data: this.salesList[0],
					handler: () => {
						console.log('Edit clicked');
						this.presentModal();
					}
				},
				{
					text: 'Cancel',
					icon: 'close',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		await actionSheet.present();

		const { role, data } = await actionSheet.onDidDismiss();
		console.log('onDidDismiss resolved with role and data', role, data);
	}
}

export interface Sale {
	id?: string;
	saleType: string;
	saleDate: Date;
	invoiceNumber: number;
	tableNumber?: number;
	mobile?: string;
	orderTotal: number;
	paymentMethod: string;
	paymentTotal: number;
	deliveryFee?: number;
	serverName: string;
}
