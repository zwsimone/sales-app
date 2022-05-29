import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { SalesHistoryPage } from "./pages/sales-history/sales-history.page";
import { SalesSummaryPage } from "./pages/sales-summary/sales-summary.page";
import { SettingsPage } from "./pages/settings/settings.page";
import { ViewSalesPage } from "./pages/view-sales/view-sales.page";
import {
	canActivate,
	redirectLoggedInTo,
	redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";
import { LoginPage } from "./pages/login/login.page";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([""]);
const redirectLoggedInToHome = () => redirectLoggedInTo(["view-sales"]);

const routes: Routes = [
	{
		path: "",
		component: LoginPage,
		...canActivate(redirectLoggedInToHome),
	},
	{
		path: "view-sales",
		component: ViewSalesPage,
		...canActivate(redirectUnauthorizedToLogin),
	},
	{
		path: "sales-summary",
		component: SalesSummaryPage,
		...canActivate(redirectUnauthorizedToLogin),
	},
	{
		path: "sales-history",
		component: SalesHistoryPage,
		...canActivate(redirectUnauthorizedToLogin),
	},
	{
		path: "settings",
		component: SettingsPage,
		...canActivate(redirectUnauthorizedToLogin),
	},
	{
		path: "login",
		component: LoginPage,
		...canActivate(redirectLoggedInToHome),
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
