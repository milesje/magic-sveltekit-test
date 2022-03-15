import { OAuthExtension } from '@magic-ext/oauth';
import { Magic } from 'magic-sdk';
import { writable } from 'svelte/store';

export const userStore = writable(null);

let magic;

async function createMagic() {
	magic = magic || new Magic('PK_LIVE_KEY', { extensions: [new OAuthExtension()] });
	return magic;
}

export async function getOauthResult() {
	const magic = await createMagic();
	try {
		const ret = await magic.oauth.getRedirectResult();
		console.log(ret);
		return ret;
	} catch (err) {
		console.error(err);
	}
	return null;
}

export async function login(): Promise<void> {
	const magic = await createMagic();
	await magic.oauth.loginWithRedirect({
		provider: 'google',
		redirectURI: 'http://localhost:3000/oauth/callback',
		scope: [
			'openid',
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/userinfo.profile'
		]
	});
}
