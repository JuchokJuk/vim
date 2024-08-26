<script lang="ts">
	import { Sparkles, X } from 'lucide-svelte';
	import Node from './Node.svelte';
	import { fade, scale } from 'svelte/transition';
	import { performanceSettings } from '$lib/shared/store/performanceSettings/performanceSettings';

	let opened = false;
</script>

<div class="container overflow-hidden card rounded-lg" transition:scale|global={{ duration: 200 }}>
	<div class="scroll">
		<div class="wrapper" class:opened>
			{#if opened}
				<ul
					class="content py-xl pr-xl"
					in:scale={{ duration: 200, delay: 100, start: 0.9 }}
					out:fade={{ duration: 200 }}
				>
					<Node settings={performanceSettings} path={[]} />
				</ul>
			{/if}
		</div>
	</div>

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
</div>

<style lang="scss">
	.container {
		position: relative;
		min-width: 20px + 14px * 2;
		min-height: 20px + 14px * 2;
		max-height: 100%;

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

		.scroll {
			overflow: auto;
			max-height: calc(100vh - map.get($spacing, xl) * 2);
			&::-webkit-scrollbar {
				display: none;
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

			ul {
				list-style: none;
			}
			.content {
				overflow: hidden;
				white-space: nowrap;
			}
		}
	}
</style>
