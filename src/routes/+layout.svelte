<script lang="ts">
	import '$lib/shared/styles/reset.scss';
	import '$lib/shared/styles/utils/spacings.scss';
	import '$lib/shared/styles/utils/elipsis.scss';
	import '$lib/shared/styles/utils/card.scss';
	import '$lib/shared/styles/utils/roundings.scss';
	import '$lib/shared/styles/utils/flex.scss';
	import '$lib/shared/styles/utils/grid.scss';
	import '$lib/shared/styles/utils/display.scss';
	import '$lib/shared/styles/utils/dimensions.scss';
	import '$lib/shared/styles/utils/positions.scss';
	import '$lib/shared/styles/utils/overflow.scss';
	import '$lib/shared/styles/utils/typography.scss';
	import '$lib/shared/styles/global.scss';
	import '$lib/shared/styles/themes.scss';
	import '$lib/shared/styles/fonts.scss';
	import { fade } from 'svelte/transition';
	import DisableZoom from '$lib/shared/UI/DisableZoom.svelte';
	import { userId } from '$lib/shared/store/user.js';

	export let data;

	$: $userId = data.useId;
</script>

<svelte:head>
	<title>VIM</title>
</svelte:head>

<DisableZoom />

<div class="container grid">
	{#key data.url}
		<div class="h-full area-1" in:fade={{ duration: 200, delay: 400 }} out:fade={{ duration: 200 }}>
			<slot />
		</div>
	{/key}
</div>

<style lang="scss">
	.container {
		background: var(--surface-0);
		min-height: 100%;
	}
</style>
