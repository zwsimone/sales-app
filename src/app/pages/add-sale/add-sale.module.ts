import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSalePageRoutingModule } from './add-sale-routing.module';

import { AddSalePage } from './add-sale.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AddSalePageRoutingModule,
		ReactiveFormsModule,
	],
	declarations: [AddSalePage],
})
export class AddSalePageModule {}
