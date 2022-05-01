import { Component, Input, OnInit } from '@angular/core';
import { modalController } from '@ionic/core';
import { Sale } from 'src/app/pages/view-sales/view-sales.page';

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.scss'],
})
export class EditSaleComponent implements OnInit {

  @Input() sale: Sale;

  constructor() { }

  ngOnInit() { }

  dismiss() {
    modalController.dismiss({
      dismissed: true
    });
  }

}
