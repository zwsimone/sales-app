import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { environment } from "src/environments/environment";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { ViewSalesPage } from "./pages/view-sales/view-sales.page";
import { SalesSummaryPage } from "./pages/sales-summary/sales-summary.page";
import { SalesHistoryPage } from "./pages/sales-history/sales-history.page";
import { FormsModule } from "@angular/forms";
import { SalesService } from "./service/sales.service";
import { EmployeesService } from "./service/employees.service";
import { HistoryService } from "./service/history.service";

@NgModule({
	declarations: [
		AppComponent,
		ViewSalesPage,
		SalesSummaryPage,
		SalesHistoryPage,
	],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		SharedModule,
		FormsModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideFirestore(() => getFirestore()),
	],
	providers: [
		SalesService,
		EmployeesService,
		HistoryService,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
