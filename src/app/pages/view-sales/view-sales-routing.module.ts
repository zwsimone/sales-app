import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSalesPage } from './view-sales.page';

const routes: Routes = [
	{
		path: '',
		component: ViewSalesPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ViewSalesPageRoutingModule {}
