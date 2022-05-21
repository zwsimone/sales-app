import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { EmployeesComponent } from "./modal/employees/employees.component";

import { SaleModalComponent } from "./modal/sale-modal/sale-modal.component";

@NgModule({
	declarations: [SaleModalComponent, EmployeesComponent],
	imports: [ReactiveFormsModule, FormsModule, IonicModule, CommonModule],
	exports: [SaleModalComponent, EmployeesComponent],
	providers: [],
})
export class SharedModule {}
