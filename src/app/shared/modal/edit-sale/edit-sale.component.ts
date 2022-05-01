import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Sale } from 'src/app/pages/view-sales/view-sales.page';

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.scss'],
})
export class EditSaleComponent implements OnInit {

  @Input() sale: Sale;

  formType: string;
  saleForm: FormGroup;

  paymentMethods = [
    { value: 'cash', label: 'Cash' },
    { value: 'card', label: 'Card' },
    { value: 'eft', label: 'EFT' }
  ];

  servers = [
    'Carly',
    'Amy',
    'Samantha',
    'Sophia',
    'Zoe'
  ];

  constructor(public modalController: ModalController, public formBuilder: FormBuilder) { }

  get invoiceNumber() {
    return this.saleForm.get('invoiceNumber');
  }

  get tableNumber() {
    return this.saleForm.get('tableNumber');
  }

  get mobile() {
    return this.saleForm.get('mobile');
  }

  get orderTotal() {
    return this.saleForm.get('mobile');
  }

  get paymentMethod() {
    return this.saleForm.get('mobile');
  }

  get paymentTotal() {
    return this.saleForm.get('mobile');
  }

  get deliveryFee() {
    return this.saleForm.get('deliveryFee');
  }

  get serverName() {
    return this.saleForm.get('deliveryFee');
  }

  ngOnInit() {
    this.saleForm = this.formBuilder.group({
      invoiceNumber: ['', [Validators.required]],
      tableNumber: ['', [this.tableFieldRequiredValidator(this.formType)]],
      mobile: ['', [this.deliveryFieldRequiredValidator(this.formType)]],
      orderTotal: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      paymentTotal: ['', [Validators.required]],
      deliveryFee: ['', [this.deliveryFieldRequiredValidator(this.formType)]],
      serverName: ['', [Validators.required]],
    });
  }

  setForm(): void {
    this.formType = this.sale.saleType;
    this.invoiceNumber.setValue(this.sale.invoiceNumber)
    this.orderTotal.setValue(this.sale.orderTotal);
    this.paymentMethod.setValue(this.sale.paymentMethod);
    this.paymentTotal.setValue(this.sale.paymentTotal);
    this.serverName.setValue(this.sale.serverName);
    if (this.formType === 'table') {
      this.tableNumber.setValue(this.sale.tableNumber);
    } else if (this.formType === 'delivery') {
      this.mobile.setValue(this.sale.mobile);
      this.deliveryFee.setValue(this.sale.deliveryFee);
    }
  }

  clearForm(): void {
    this.saleForm.reset();
  }

  submitForm(): void {
    console.log(this.saleForm.value);
    this.clearForm();
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      sale: {
        saleType: this.formType,
        saleDate: new Date('2022-04-30'),
        invoiceNumber: this.invoiceNumber,
        mobile: this.mobile,
        orderTotal: this.orderTotal,
        paymentMethod: this.paymentMethod,
        paymentTotal: this.paymentTotal,
        deliveryFee: this.deliveryFee,
        serverName: this.serverName,
      }
    });
  }

  tableFieldRequiredValidator(saleType: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (saleType === 'table') {
        return control.value === '' ? { required: true } : null;
      } else {
        return null;
      }
    };
  }

  deliveryFieldRequiredValidator(saleType: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (saleType === 'delivery') {
        return control.value === '' ? { required: true } : null;
      } else {
        return null;
      }
    };
  }
}
