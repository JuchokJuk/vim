<script lang="ts">
	import Object from './Object.svelte';
	import { scale, fade } from 'svelte/transition';

	import { objects } from '../assets/objects';
</script>

<div class="objects p-2xl gap-xl">
	{#each objects as object, index (object)}
		<div
			in:scale|global={{
				duration: 200,
				delay: 40 * index
			}}
			out:fade|global={{
				duration: 200
			}}
		>
			<Object src={object} />
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
