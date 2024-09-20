<script lang="ts">
	import Object from './Object.svelte';
	import { scale, fade } from 'svelte/transition';

	export let close: () => void;

	import { itemsCatalog } from '$lib/shared/editorEngine/state/server/itemsCatalog';
</script>

<div class="objects p-2xl gap-xl">
	{#each $itemsCatalog.data as funritureItem, index (funritureItem)}
		<div
			in:scale|global={{
				duration: 200,
				delay: 40 * index
			}}
			out:fade|global={{
				duration: 200
			}}
		>
			<Object object={funritureItem} {close} />
		</div>
	{/each}
</div>

<style lang="scss">
	.objects {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(133.33px, 1fr));

		overflow: auto;
		align-items: start;

		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>
