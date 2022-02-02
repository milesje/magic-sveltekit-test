<script>
	import * as auth from '$lib/stores/auth';
	import { onMount } from 'svelte';

	let email = '';

	onMount(async () => {
		try {
			auth.isLoggedIn();
			
		} catch (err) {
			console.log(err);
		}
	});

	async function login() {
		try {
			await auth.login();
		} catch (err) {
			console.error(err);
		}
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={() => login()}>Login</button>
