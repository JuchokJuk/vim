<script lang="ts">
	import { cx } from '$lib/shared/utils/cx';

	import { scale, slide } from 'svelte/transition';

	export let activeItemIndex = 0;

	export let fullWidth: boolean | undefined = false;

	export let color: 'primary' | 'neutral' = 'neutral';

	export let items: { value: any; label?: string; icon?: any; handler?: () => void }[];
</script>

<div
	class={cx('toogle-group', $$props.class)}
	class:fullWidth
	transition:slide|global={{ duration: 200, axis: 'x' }}
>
	<div class="layer">
		{#each items as item, index (item)}
			<button
				class="button rounded-md paragraph-lg"
				in:scale|global={{ duration: 200, delay: 40 * index }}
				on:pointerdown={() => {
					activeItemIndex = index;
					if (item.handler) item.handler();
				}}
			>
				{#if item.icon}
					<svelte:component this={item.icon} class="icon" />
				{/if}

				{#if item.label}
					{item.label}
				{/if}
			</button>
		{/each}
	</div>
	<div
		class="layer active {color}"
		style="--active-item-index: {activeItemIndex}; --items-count: {items.length};"
	>
		{#each items as item, index (item)}
			<button
				class="button rounded-md paragraph-lg"
				in:scale|global={{ duration: 200, delay: 40 * index }}
				on:pointerdown={() => {
					activeItemIndex = index;
				}}
			>
				{#if item.icon}
					<svelte:component this={item.icon} class="icon" />
				{/if}

				{#if item.label}
					{item.label}
				{/if}
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.toogle-group {
		display: grid;
		width: fit-content;

		.layer {
			grid-area: 1/1;
			display: flex;
			gap: 4px;

			&.active {
				/* prettier-ignore */
				clip-path: inset(
					0
                    calc((var(--items-count) - 1 - var(--active-item-index)) * ((100% - 4px * (var(--items-count) - 1)) / var(--items-count) + 4px)) /* right side offset from right */
                    0
                    calc(var(--active-item-index) * ((100% - 4px * (var(--items-count) - 1)) / var(--items-count) + 4px)) /* left side offset from left */
                    round 8px
				);
				transition: clip-path 0.2s;

				&.primary {
					background: var(--primary-0);

					.button {
						color: var(--white-const);
					}

					@include hover {
						.button {
							color: var(--white-const);
						}
					}
				}

				&.neutral {
					background: var(--surface-2);

					.button {
						color: var(--text-1);
					}

					@include hover {
						.button {
							color: var(--text-1);
						}
					}
				}
			}

			.button {
				border: none;
				background: none;

				width: 40px;
				height: 40px;

				display: flex;
				align-items: center;
				justify-content: center;
				transition: color 0.2s;
				color: var(--text-0);

				cursor: pointer;

				&:focus {
					outline: none;
				}

				@include hover {
					color: var(--text-1);
				}

				:global(.icon) {
					flex-shrink: 0;
					width: 20px;
					height: 20px;
					margin: 14px;
				}
			}
		}

		&.fullWidth {
			width: 100%;

			.button {
				width: 100%;
			}
		}
	}
</style>
