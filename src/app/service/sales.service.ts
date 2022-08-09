import { Injectable } from "@angular/core";
import { collectionData, docData, Firestore } from "@angular/fire/firestore";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from "@firebase/firestore";
import { map, Observable } from "rxjs";
import { ISale, Sale } from "../shared/model/sale";

@Injectable({
	providedIn: "root",
})
export class SalesService {
	constructor(private firestore: Firestore) {}

	getAllSales(): Observable<Array<Sale>> {
		const salesRef = collection(this.firestore, "history");
		return collectionData(salesRef, { idField: "id" }).pipe(
			map((sales: Sale[]) =>
				sales.sort((sale1, sale2) => {
					if (sale1.saleDate > sale2.saleDate) return -1;
					if (sale1.saleDate < sale2.saleDate) return 1;
					return 0;
				})
			)
		) as Observable<Sale[]>;
	}

	getSale(id: string): Observable<ISale> {
		const saleDocRef = doc(this.firestore, `history/${id}`);
		return docData(saleDocRef, { idField: "id" }) as Observable<ISale>;
	}

	addSale(sale: ISale) {
		const salesRef = collection(this.firestore, "history");
		return addDoc(salesRef, sale);
	}

	deleteSale(sale: ISale) {
		const saleDocRef = doc(this.firestore, `history/${sale.id}`);
		return deleteDoc(saleDocRef);
	}

	updateSale(sale: ISale) {
		const saleDocRef = doc(this.firestore, `history/${sale.id}`);
		return updateDoc(saleDocRef, {
			deliveryFee: sale.deliveryFee,
			invoiceNumber: sale.invoiceNumber,
			mobile: sale.mobile,
			orderTotal: sale.orderTotal,
			paymentMethod: sale.paymentMethod,
			paymentTotal: sale.paymentTotal,
			saleDate: sale.saleDate,
			serverName: sale.serverName,
		});
	}

	deleteAllRecords() {
		const historyRef = collection(this.firestore, "history");
		const snapshot = collectionData(historyRef, {
			idField: "id",
		}) as Observable<ISale[]>;
		snapshot.forEach((records) => {
			records.forEach((record) => {
				const recordRef = doc(this.firestore, `history/${record.id}`);
				deleteDoc(recordRef);
			});
		});
	}

	getTodaysSales() {
		const salesRef = collection(this.firestore, "history");
		return (
			collectionData(salesRef, { idField: "id" }) as Observable<Sale[]>
		).pipe(
			map((sales: Sale[]) =>
				sales.filter((sale: Sale) => {
					const saleDate = new Date(sale.saleDate);
					const currentDate = new Date();

					if (
						saleDate.getMonth() === currentDate.getMonth() &&
						saleDate.getDate() === currentDate.getDate()
					)
						return true;
					else return false;
				})
			),
			map((sales: Sale[]) =>
				sales.sort((sale1, sale2) => {
					if (sale1.invoiceNumber > sale2.invoiceNumber) return -1;
					if (sale1.invoiceNumber < sale2.invoiceNumber) return 1;
					return 0;
				})
			)
		);
	}
}
