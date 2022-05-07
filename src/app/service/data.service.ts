import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { ISale, Sale } from '../shared/model/sale';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getSales(): Observable<Sale[]> {
    const salesRef = collection(this.firestore, 'sales');
    return collectionData(salesRef, { idField: 'id' }) as Observable<Sale[]>;
  }

  getSale(id: string): Observable<ISale> {
    const saleDocRef = doc(this.firestore, `sales/${id}`);
    return docData(saleDocRef, { idField: 'id' }) as Observable<ISale>;
  }

  addSale(sale: ISale) {
    const salesRef = collection(this.firestore, 'sales');
    return addDoc(salesRef, sale);
  }

  deleteSale(sale: ISale) {
    const saleDocRef = doc(this.firestore, `sales/${sale.id}`);
    return deleteDoc(saleDocRef);
  }

  updateSale(sale: ISale) {
    const saleDocRef = doc(this.firestore, `sales/${sale.id}`);
    return updateDoc(saleDocRef, {
      deliveryFee: sale.deliveryFee,
      invoiceNumber: sale.invoiceNumber,
      mobile: sale.mobile,
      orderTotal: sale.orderTotal,
      paymentMethod: sale.paymentMethod,
      paymentTotal: sale.paymentTotal,
      saleDate: sale.saleDate,
      serverName: sale.serverName
    });
  }
}
