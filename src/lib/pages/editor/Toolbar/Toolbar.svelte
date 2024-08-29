<script lang="ts">
	import { BrickWall, MousePointer2, Ruler, Search } from 'lucide-svelte';
	import ObjectsScroller from '$lib/pages/editor/Toolbar/ObjectsScroller/ObjectsScroller.svelte';

	import { fly } from 'svelte/transition';
	import ObjectsGrid from '$lib/pages/editor/Toolbar/ObjectsGrid/ObjectsGrid.svelte';
	import { outside } from '$lib/shared/utils/outside';
	import ToggleGroup from '$lib/shared/UI/ToggleGroup.svelte';

	const ITEM_SIZE = 48;

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
			value: 'cursor',
			icon: MousePointer2
		},
		{
			value: 'ruler',
			icon: Ruler
		},
		{
			value: 'wall',
			icon: BrickWall
		}
	];
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && close()} />

<div
	class="toolbar-container bottom-xl px-2xl"
	class:opened
	style="--item-size: {ITEM_SIZE}px;"
	transition:fly|global={{ duration: 200, y: 64 }}
>
	<div
		class="card rounded-lg toolbar"
		class:elevated={opened}
		class:rounded-2xl={opened}
		use:outside={{ event: 'pointerdown', cb: close }}
	>
		<div class="search">
			<div class="input-wrapper rounded-md">
				{#if !opened}
					<ToggleGroup items={tools} class="border-right p-xs" color="primary" />
				{/if}
				<div class="input-container">
					{#if opened}
						<input class="input pl-lg py-xs pr-xs" bind:this={input} />
					{:else}
						<div class="objects-scroller">
							<ObjectsScroller itemSize={ITEM_SIZE} />
						</div>
					{/if}
				</div>
				<div class="tools p-xs border-left">
					<button on:pointerdown={open} on:click={open} class="button">
						<Search class="icon" />
					</button>
				</div>
			</div>
		</div>
		{#if opened}
			<ObjectsGrid />
		{/if}
	</div>
</div>

<style lang="scss">
	.toolbar-container {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		max-width: 600px;
		transition: max-width 0.2s;

		&:not(.opened) {
			.toolbar {
				@include hover {
					@include elevated;
					transform: scale(1.02);
				}
			}
		}

		&.opened {
			max-width: 520px;
			.toolbar {
				height: clamp(
					0px,
					calc(100vh - map.get($spacings, 'xl') * 2),
					800px - map.get($spacings, 'xl') * 2
				);

				.search {
					@include spacing(padding, '2xl');
					border-bottom: 1px solid var(--outline-0);
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
			}
		}
	}
	.toolbar {
		display: flex;
		flex-direction: column;
		height: var(--item-size);
		max-width: 600px;

		transition:
			transform 0.2s,
			box-shadow 0.2s,
			padding 0.2s,
			height 0.2s,
			border-radius 0.2s;

		.search {
			transition:
				padding 0.2s,
				border 0.2s;
			border-bottom: 0 solid transparent;
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
					width: 100%;

					.objects-scroller {
						grid-area: 1 / 1;
					}

					.input {
						width: 100%;
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
						@include hover {
							:global(.icon) {
								color: var(--text-1);
							}
						}
						:global(.icon) {
							flex-shrink: 0;
							width: 20px;
							height: 20px;
							color: var(--text-0);
							transition: color 0.2s;
						}
					}
				}
			}
		}
	}
</style>
