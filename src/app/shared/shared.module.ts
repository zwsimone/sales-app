import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { EditSaleComponent } from "./modal/edit-sale/edit-sale.component";

@NgModule({
    declarations: [
        EditSaleComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        CommonModule
    ],
    exports: [
        EditSaleComponent
    ],
    providers: []
})
export class SharedModule { }