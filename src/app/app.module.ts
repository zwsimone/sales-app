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
import { getAuth, provideAuth } from "@angular/fire/auth";
import { ViewSalesPage } from "./pages/view-sales/view-sales.page";
import { SalesSummaryPage } from "./pages/sales-summary/sales-summary.page";
import { SalesHistoryPage } from "./pages/sales-history/sales-history.page";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SalesService } from "./service/sales.service";
import { EmployeesService } from "./service/employees.service";
import { HistoryService } from "./service/history.service";
import { LoginPage } from "./pages/login/login.page";
import { ServiceWorkerModule } from "@angular/service-worker";
import { SettingsPage } from "./pages/settings/settings.page";

@NgModule({
	declarations: [
		AppComponent,
		ViewSalesPage,
		SalesSummaryPage,
		SalesHistoryPage,
		LoginPage,
		SettingsPage,
	],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideFirestore(() => getFirestore()),
		provideAuth(() => getAuth()),
		ServiceWorkerModule.register("ngsw-worker.js", {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: "registerWhenStable:30000",
		}),
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
