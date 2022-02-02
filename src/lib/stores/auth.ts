import { OAuthExtension } from '@magic-ext/oauth';
import { Magic } from 'magic-sdk';
import { writable } from 'svelte/store';

export const userStore = writable(null);

let magic;

async function createMagic() {
	magic = magic || new Magic('YOUR KEY GOES HERE', {extensions: [new OAuthExtension()]});
	return magic;
}

export async function getOauthResult(){
	return await magic.oauth.getRedirectResult();
}

export async function login(): Promise<void> {
	const magic = await createMagic();
	await magic.oauth.loginWithRedirect({
		provider: 'google',
		redirectURI: 'http://localhost:3000/oauth/callback',
		scope: ['user:email']
	})
}

