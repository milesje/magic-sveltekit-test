<script>
    import { getOauthResult } from '$lib/stores/auth';
    import { onMount } from 'svelte';

    let result
    onMount(async () => {
        result = await getOauthResult()
    })
</script>

<h1>Callback</h1>

<p>{result.magic.idToken}</p>