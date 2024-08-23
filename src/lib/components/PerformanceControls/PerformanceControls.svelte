<script lang="ts">
	import { performanceSettings } from '$lib/store/performanceSettings';
	import { Sparkles, X } from 'lucide-svelte';
	import Node from './Node.svelte';
	import { fade, scale } from 'svelte/transition';

	let opened = false;
</script>

<div class="container card py-xl pr-xl corners-lg" transition:scale|global={{ duration: 200 }}>
	<button class="button" on:pointerdown={() => (opened = !opened)}>
		{#key opened}
			<div in:fade={{ delay: 200, duration: 200 }} out:fade={{ duration: 200 }}>
				{#if opened}
					<X class="icon" />
				{:else}
					<Sparkles class="icon" />
				{/if}
			</div>
		{/key}
	</button>

	<div class="wrapper" class:opened>
		{#if opened}
			<div
				class="content"
				in:scale={{ duration: 200, delay: 100, start: 0.9 }}
				out:fade={{ duration: 200 }}
			>
				{#each Object.keys($performanceSettings) as feature}
					<Node
						node={$performanceSettings[feature]}
						path={[feature]}
						label={$performanceSettings[feature].title}
					/>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		position: relative;
		min-width: 20px + 14px * 2;
		min-height: 20px + 14px * 2;

		.button {
			position: absolute;
			top: 4px;
			right: 4px;

			border: none;
			background: none;

			width: 40px;
			height: 40px;

			display: grid;

			cursor: pointer;

			&:focus {
				outline: none;
			}
			&:hover {
				:global(.icon) {
					color: var(--text-1);
				}
			}
			:global(.icon) {
				margin: 10px;
				width: 20px;
				height: 20px;
				color: var(--text-0);
				transition: color 0.2s;
			}
		}

		.wrapper {
			display: grid;

			grid-template-rows: 0fr;
			grid-template-columns: 0fr;

			transition:
				grid-template-rows 200ms,
				grid-template-columns 200ms;

			&.opened {
				grid-template-rows: 1fr;
				grid-template-columns: 1fr;
			}
			.content {
				overflow: hidden;
				display: flex;
				flex-direction: column;
				@include spacing(gap, lg);
				padding-left: -1 * map.get($spacing, 'xl');
				white-space: nowrap;
			}
		}
	}
</style>
