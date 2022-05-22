import { Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(private auth: Auth) {}

	async login({ email, password }) {
		try {
			const user = await signInWithEmailAndPassword(
				this.auth,
				email,
				password
			);
			return user;
		} catch (err) {
			return null;
		}
	}

	logout() {
		return signOut(this.auth);
	}
}
