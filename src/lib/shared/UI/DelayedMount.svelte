<script lang="ts">
	import { onMount } from 'svelte';

	export let delay: number;

	let mounted = false;

	onMount(() => {
		setTimeout(() => {
			mounted = true;
		}, delay);
	});
</script>

{#if mounted}
	<slot />
{/if}
