import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { SalesHistoryPage } from "./pages/sales-history/sales-history.page";
import { SalesSummaryPage } from "./pages/sales-summary/sales-summary.page";
import { SettingsPage } from "./pages/settings/settings.page";
import { ViewSalesPage } from "./pages/view-sales/view-sales.page";

const routes: Routes = [
	{
		path: "",
		redirectTo: "view-sales",
		pathMatch: "full",
	},
	{
		path: "folder/:id",
		loadChildren: () =>
			import("./folder/folder.module").then((m) => m.FolderPageModule),
	},
	{
		path: "view-sales",
		component: ViewSalesPage,
	},
	{
		path: "sales-summary",
		component: SalesSummaryPage,
	},
	{
		path: "sales-history",
		component: SalesHistoryPage,
	},
	{
		path: "settings",
		component: SettingsPage,
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			preloadingStrategy: PreloadAllModules,
			// enableTracing: true,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
