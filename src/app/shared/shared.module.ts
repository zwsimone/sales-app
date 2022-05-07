import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SaleModalComponent } from './modal/sale-modal/sale-modal.component';

@NgModule({
    declarations: [
        SaleModalComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        CommonModule
    ],
    exports: [
        SaleModalComponent
    ],
    providers: []
})
export class SharedModule { }