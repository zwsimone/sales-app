import { DataService } from 'src/app/service/data.service';
import { SaleModalComponent } from 'src/app/shared/modal/sale-modal/sale-modal.component';
import { Sale } from 'src/app/shared/model/sale';

import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';

@Component({
	selector: 'app-view-sales',
	templateUrl: './view-sales.page.html',
	styleUrls: ['./view-sales.page.scss'],
})
export class ViewSalesPage implements OnInit {
	viewType: string;

	salesList: Sale[];

	modal: HTMLElement;

	date: number;

	constructor(private dataService: DataService, public actionSheetController: ActionSheetController, public modalController: ModalController) {
		this.viewType = 'all';
		this.dataService.getSales().subscribe(data => {
			this.salesList = data;
		})
		this.date = Date.now();
	}

	ngOnInit() { }

	async addSaleModal() {
		const modal = await this.modalController.create({
			component: SaleModalComponent,
			componentProps: {
				mode: "add"
			}
		});
		await modal.present();
	}

	async editSaleModal(sale: Sale) {
		const modal = await this.modalController.create({
			component: SaleModalComponent,
			componentProps: {
				saleID: sale.id,
				mode: "update"
			}
		});
		modal.present();
	}

	async handleOptions(sale: Sale) {
		const actionSheet = await this.actionSheetController.create({
			header: 'Options',
			buttons: [
				{
					text: 'Delete',
					role: 'destructive',
					icon: 'trash',
					handler: () => {
						console.log('Delete clicked');
						this.dataService.deleteSale(sale);
					}
				},
				{
					text: 'Edit',
					icon: 'create-outline',
					data: this.salesList[0],
					handler: () => {
						console.log('Edit clicked');
						this.editSaleModal(sale);
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
	}
}
