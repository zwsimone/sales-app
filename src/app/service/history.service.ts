import { Injectable } from "@angular/core";
import { collectionData, doc, Firestore } from "@angular/fire/firestore";
import { addDoc, collection, deleteDoc } from "@firebase/firestore";
import { Observable } from "rxjs";
import { Sale } from "../shared/model/sale";

@Injectable({
	providedIn: "root",
})
export class HistoryService {
	constructor(private firestore: Firestore) {}

	getHistory(): Observable<Sale[]> {
		const historyRef = collection(this.firestore, "history");
		return collectionData(historyRef, { idField: "id" }) as Observable<
			Sale[]
		>;
	}

	addHistoryRecord(sale: Sale) {
		const historyRef = collection(this.firestore, "history");
		return addDoc(historyRef, sale);
	}

	deleteAllRecords() {
		const historyRef = collection(this.firestore, "history");
		const snapshot = collectionData(historyRef, {
			idField: "id",
		}) as Observable<Sale[]>;
		snapshot.forEach((records) => {
			records.forEach((record) => {
				const recordRef = doc(
					this.firestore,
					`history/${record.data.id}`
				);
				deleteDoc(recordRef);
			});
		});
	}
}
