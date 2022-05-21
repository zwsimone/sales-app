import { Injectable } from "@angular/core";
import { collectionData, Firestore } from "@angular/fire/firestore";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from "@firebase/firestore";
import { Observable, shareReplay } from "rxjs";

const CACHE_SIZE = 1;

@Injectable({
	providedIn: "root",
})
export class EmployeesService {
	private cache$: Observable<IEmployee[]>;

	constructor(private firestore: Firestore) {}

	get employees() {
		if (!this.cache$) {
			this.cache$ = this.getEmployees().pipe(shareReplay(CACHE_SIZE));
		}
		return this.cache$;
	}

	getEmployees(): Observable<Array<IEmployee>> {
		const employeesRef = collection(this.firestore, "employees");
		return collectionData(employeesRef, { idField: "id" }) as Observable<
			IEmployee[]
		>;
	}

	addEmployee(employee: IEmployee) {
		const employeesRef = collection(this.firestore, "employees");
		return addDoc(employeesRef, employee);
	}

	deleteEmployee(employee: IEmployee) {
		const employeeDocRef = doc(this.firestore, `employees/${employee.id}`);
		return deleteDoc(employeeDocRef);
	}

	updateEmployee(employee: IEmployee) {
		const employeeDocRef = doc(this.firestore, `employees/${employee.id}`);
		return updateDoc(employeeDocRef, { name: employee.name });
	}
}

export interface IEmployee {
	id?: string;
	name: string;
}
