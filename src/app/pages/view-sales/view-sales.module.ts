import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSalesPageRoutingModule } from './view-sales-routing.module';

import { ViewSalesPage } from './view-sales.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ViewSalesPageRoutingModule,
	],
	declarations: [ViewSalesPage],
})
export class ViewSalesPageModule {}
