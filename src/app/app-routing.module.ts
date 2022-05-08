import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SalesSummaryPage } from './pages/sales-summary/sales-summary.page';
import { ViewSalesPage } from './pages/view-sales/view-sales.page';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'view-sales',
		pathMatch: 'full',
	},
	{
		path: 'folder/:id',
		loadChildren: () =>
			import('./folder/folder.module').then((m) => m.FolderPageModule),
	},
	{
		path: 'view-sales',
		component: ViewSalesPage
	},
	{
		path: 'sales-summary',
		component: SalesSummaryPage
	},
	{
		path: 'sales-history',
		loadChildren: () =>
			import('./pages/sales-history/sales-history.module').then(
				(m) => m.SalesHistoryPageModule
			),
	},
	{
		path: 'settings',
		loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, enableTracing: true }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule { }
