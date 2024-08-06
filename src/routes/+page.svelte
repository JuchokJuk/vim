<script lang="ts">
	import { Search } from 'lucide-svelte';
	import ObjectsScroller from '$lib/components/ObjectsScroller/ObjectsScroller.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import ObjectsGrid from '$lib/components/ObjectsGrid/ObjectsGrid.svelte';
	import { outside } from '$lib/utils/outside';
	import ToolsToggleGroup from '$lib/components/ToolsToggleGroup/ToolsToggleGroup.svelte';

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

	let mounted = false;

	onMount(() => {
		setTimeout(() => {
			mounted = true;
		}, 400);
	});
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && close()} />

<div class="container p-xl">
	{#if mounted}
		<div
			transition:fly={{ duration: 400, y: 64 }}
			style="
				--item-size: {ITEM_SIZE}px;
				--items-per-screen: {ITEMS_PER_SCREEN};
			"
		>
			<div class="toolbar" class:opened use:outside={{ event: 'pointerdown', cb: close }}>
				<div class="input-wrapper">
					{#if !opened}
						<ToolsToggleGroup class="border-right" />
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
	{/if}
</div>

<style lang="scss">
	.container {
		height: 100%;
		display: flex;
		align-items: end;
		justify-content: center;
		background: var(--surface-0);
		overflow: hidden;

		.toolbar {
			display: flex;
			flex-direction: column;
			border-radius: 12px;
			background: var(--surface-1);
			height: var(--item-size);
			box-shadow:
				0 1px 0 0 var(--light-0) inset,
				0 0 0 1px var(--light-1) inset,
				0 1px 4px 0 var(--shadow-0);

			transition:
				transform 0.3s,
				box-shadow 0.3s,
				padding 0.3s,
				height 0.3s,
				border-radius 0.3s;
			transform-origin: center bottom;

			&:hover:not(.opened) {
				transform: scale(1.02);
			}

			&:hover,
			&.opened {
				box-shadow:
					0 1px 0 0 var(--light-0) inset,
					0 0 0 1px var(--light-1) inset,
					0 4px 8px 0 var(--shadow-1);
			}

			&.opened {
				transform: translateY(-64px);

				@include spacing(padding-top, xl);
				@include spacing(padding-left, xl);
				@include spacing(padding-right, xl);

				height: 480px;
				border-radius: 20px;

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
				border-radius: 8px;
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
					transition: border-color 0.3s;
					border-right: 1px solid var(--outline-0);
				}

				.tools {
					display: flex;
					gap: 4px;

					&.border-left {
						transition: border-color 0.3s;
						border-left: 1px solid var(--outline-0);
					}

					.button {
						border: none;
						background: transparent;
						transition: background-color 0.4s;
						border-radius: 8px;
						width: 40px;
						height: 40px;
						display: flex;
						align-items: center;
						justify-content: center;

						&.active {
							background: var(--primary-0);
							:global(.icon) {
								color: var(--white-const);
							}
						}

						&:not(.active):hover {
							:global(.icon) {
								color: var(--text-1);
							}
						}

						&:focus {
							outline: none;
						}

						:global(.icon) {
							flex-shrink: 0;
							color: var(--text-0);
							transition: color 0.2s;
							width: 20px;
							height: 20px;
							margin: 14px;
							cursor: pointer;
						}
					}
				}
			}
		}
	}
</style>
