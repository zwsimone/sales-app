import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
		loadChildren: () =>
			import('./pages/view-sales/view-sales.module').then(
				(m) => m.ViewSalesPageModule
			),
	},
	{
		path: 'sales-summary',
		loadChildren: () =>
			import('./pages/sales-summary/sales-summary.module').then(
				(m) => m.SalesSummaryPageModule
			),
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
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule { }
