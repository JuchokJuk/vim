<script lang="ts">
	import { cx } from '$lib/utils/cx';

	import { scale, slide } from 'svelte/transition';

	export let activeToolIndex = 0;

	export let color: 'primary' | 'neutral' = 'neutral';

	export let tools: { name: string; icon: any }[];
</script>

<div class={cx('tools p-xs', $$props.class)} transition:slide|global={{ duration: 200, axis: 'x' }}>
	<div class="layer">
		{#each tools as tool, index (tool)}
			<button
				class="button corners-md"
				in:scale|global={{ duration: 200, delay: 40 * index }}
				on:pointerdown={() => {
					activeToolIndex = index;
				}}
			>
				<svelte:component this={tool.icon} class="icon" />
			</button>
		{/each}
	</div>
	<div
		class="layer active {color}"
		style="--active-tool-index: {activeToolIndex}; --tools-count: {tools.length};"
	>
		{#each tools as tool, index (tool)}
			<button
				class="button corners-md"
				in:scale|global={{ duration: 200, delay: 40 * index }}
				on:pointerdown={() => {
					activeToolIndex = index;
				}}
			>
				<svelte:component this={tool.icon} class="icon" />
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.tools {
		display: grid;
		.layer {
			grid-area: 1/1;
			display: flex;
			gap: 4px;

			&.active {
				/* prettier-ignore */
				clip-path: inset(
					0
                    calc((var(--tools-count) - 1 - var(--active-tool-index)) * (40px + 4px)) /* right side offset from right */
                    0
                    calc(var(--active-tool-index) * (40px + 4px)) /* left side offset from left */
                    round 8px
				);
				transition: clip-path 0.2s;

				&.primary {
					background: var(--primary-0);
					.button:hover,
					.button {
						:global(.icon) {
							color: var(--white-const);
						}
					}
				}

				&.neutral {
					background: var(--surface-2);
					.button:hover,
					.button {
						:global(.icon) {
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
					transition: color 0.2s;
					color: var(--text-0);
				}
			}
		}
	}
</style>
