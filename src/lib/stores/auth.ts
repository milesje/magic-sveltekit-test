import { Magic } from 'magic-sdk';
import { writable } from 'svelte/store';

export const userStore = writable(null);

let magic;

async function createMagic() {
	magic = magic || new Magic(import.meta.env.VITE_MAGIC_PUBLIC_KEY as string);
	return magic;
}

async function getUser(email: string): Promise<Array<any>> {
	const results = await fetch(`http://localhost:8080/market-edge/users/email/${email}`);
	return await results.json();
}

export async function logout() {
	const magic = await createMagic();
	magic.user.logout();
}

export async function getToken(): Promise<string> {
	const magic = await createMagic();
	return await magic.user.getIdToken();
}

export async function isLoggedIn() {
	const magic = await createMagic();
	if (await magic.user.isLoggedIn()) {
		const { email, publicAddress } = await magic.user.getMetadata();
		const user = await getUser(email);
		userStore.set(user);
	} else {
		throw new Error('User not authenticated');
	}
}

export async function login(email: string): Promise<void> {
	const magic = await createMagic();
	const user = await getUser(email);

	if (user.length !== 1) {
		// throw error
		throw new Error('User was not found!');
	} else {
		console.log('we found the user now lets actuall have them login....', email);
		const didToken = await magic.auth.loginWithMagicLink({ email });
		console.log('we have returned from auth.login');
		// Validate the did token????
		if (didToken) {
			console.log('didToken: ', didToken);
			userStore.set(user);
		}
	}
}
