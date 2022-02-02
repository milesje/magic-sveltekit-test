<script>
    import { getOauthResult } from '$lib/stores/auth';
import { OAuthErrorCode } from '@magic-ext/oauth';
    import { onMount } from 'svelte';

    let result
    onMount(async () => {
        console.log('callback::onMount')
        result = await getOauthResult()
        console.log('we have OAuth Results')
    })
</script>

<h1>Callback</h1>
{#if result !== undefined && result !== null}
<p>{result.magic.idToken}</p>

<p>{result.oauth.userInfo.name}</p>
<p>{result.oauth.userInfo.email}</p>
{/if}

