<script lang="ts">
	import { BrickWall, MousePointer2, Ruler, Search } from 'lucide-svelte';
	import ObjectsScroller from '$lib/components/Toolbar/ObjectsScroller/ObjectsScroller.svelte';

	import { fly } from 'svelte/transition';
	import ObjectsGrid from '$lib/components/Toolbar/ObjectsGrid/ObjectsGrid.svelte';
	import { outside } from '$lib/utils/outside';
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';

	const ITEM_SIZE = 48;
	const ITEMS_PER_SCREEN = 7;

	let opened = false;

	function open() {
		opened = true;

		requestAnimationFrame(() => {
			input.focus();
		});
	}

	function close() {
		opened = false;
	}

	let input: HTMLDivElement;

	const tools = [
		{
			name: 'cursor',
			icon: MousePointer2
		},
		{
			name: 'ruler',
			icon: Ruler
		},
		{
			name: 'wall',
			icon: BrickWall
		}
	];
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && close()} />

<div
	transition:fly|global={{ duration: 200, y: 64 }}
	style="
		--item-size: {ITEM_SIZE}px;
		--items-per-screen: {ITEMS_PER_SCREEN};
	"
>
	<div
		class="card corners-lg toolbar"
		class:opened
		class:elevated={opened}
		class:corners-2xl={opened}
		use:outside={{ event: 'pointerdown', cb: close }}
	>
		<div class="input-wrapper corners-md">
			{#if !opened}
				<ToggleGroup items={tools} class="border-right" color="primary" />
			{/if}
			<div class="input-container">
				{#if opened}
					<input class="input pl-lg py-xs pr-xs" bind:this={input} />
				{:else}
					<div class="objects-scroller">
						<ObjectsScroller itemSize={ITEM_SIZE} itemsPerScreen={ITEMS_PER_SCREEN} />
					</div>
				{/if}
			</div>
			<div class="tools p-xs border-left">
				<button on:pointerdown={open} on:click={open} class="button">
					<Search class="icon" />
				</button>
			</div>
		</div>
		{#if opened}
			<ObjectsGrid />
		{/if}
	</div>
</div>

<style lang="scss">
	.toolbar {
		display: flex;
		flex-direction: column;
		height: var(--item-size);

		transition:
			transform 0.2s,
			box-shadow 0.2s,
			padding 0.2s,
			height 0.2s,
			border-radius 0.2s;

		&:hover:not(.opened) {
			transform: scale(1.02);
		}

		&:hover {
			@include elevated;
		}

		&.opened {
			transform: translateY(-64px);

			@include spacing(padding-top, xl);
			@include spacing(padding-left, xl);
			@include spacing(padding-right, xl);

			height: 480px;

			.input-wrapper {
				background: var(--surface-2);

				.tools.border-left {
					border-left: 1px solid transparent;
				}

				:global(.border-right) {
					border-right: 1px solid transparent;
				}
			}
		}

		.input-wrapper {
			display: flex;
			height: var(--item-size);
			box-shadow: 0 0 0 0 transparent inset;

			transition:
				background-color 0.2s,
				box-shadow 0.2s;

			&:has(.input:hover) {
				box-shadow: 0 0 0 1px var(--outline-0) inset;
			}

			&:has(.input:focus) {
				box-shadow: 0 0 0 2px var(--primary-0) inset;
			}

			.input-container {
				display: grid;
				width: calc(var(--item-size) * var(--items-per-screen));

				.objects-scroller {
					grid-area: 1 / 1;
				}

				.input {
					font-size: 16px;
					grid-area: 1 / 1;

					border: none;
					background: none;

					&:focus {
						outline: none;
					}
				}
			}

			:global(.border-right) {
				transition: border-color 0.2s;
				border-right: 1px solid var(--light-1);
			}

			.tools {
				display: flex;
				gap: 4px;

				&.border-left {
					transition: border-color 0.2s;
					border-left: 1px solid var(--light-1);
				}

				.button {
					border: none;
					background: none;

					width: 40px;
					height: 40px;

					display: flex;
					align-items: center;
					justify-content: center;

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
						flex-shrink: 0;
						width: 20px;
						height: 20px;
						margin: 14px;
						color: var(--text-0);
						transition: color 0.2s;
					}
				}
			}
		}
	}
</style>
