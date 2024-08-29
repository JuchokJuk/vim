<script lang="ts">
	import { Sparkles } from 'lucide-svelte';
	import Settings from './Settings.svelte';
	import { fade, scale } from 'svelte/transition';

	let opened = false;

	function open() {
		opened = true;
	}

	function close() {
		opened = false;
	}
</script>

<div class="container overflow-hidden card rounded-lg" transition:scale|global={{ duration: 200 }}>
	<div class="wrapper" class:opened>
		{#if opened}
			<div
				class="content"
				in:scale={{ duration: 200, delay: 100, start: 0.9 }}
				out:fade={{ duration: 200 }}
			>
				<Settings {close} />
			</div>
		{/if}
	</div>

	{#if !opened}
		<div transition:fade={{ duration: 200 }}>
			<button on:pointerdown={open}>
				<Sparkles class="icon" />
			</button>
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		position: relative;
		min-width: 20px + 14px * 2;
		min-height: 20px + 14px * 2;
		max-height: 100%;
		max-width: 340px;

		button {
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

			@include hover {
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
			}
		}
	}
</style>
