<script lang="ts">
	import { cx } from '$lib/utils/cx';
	import { MousePointer2, BrickWall, Ruler, PenTool } from 'lucide-svelte';

	import { scale, slide } from 'svelte/transition';

	let activeToolIndex = 0;

	const TOOLS = [
		{
			name: 'cursor',
			icon: MousePointer2
		},
		{
			name: 'pen',
			icon: PenTool
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

<div class={cx('tools p-xs', $$props.class)} transition:slide|global={{ duration: 300, axis: 'x' }}>
	<div class="layer">
		{#each TOOLS as tool, index (tool)}
			<button
				class="button"
				in:scale|global={{ duration: 400, delay: 40 * index }}
				on:pointerdown={() => {
					activeToolIndex = index;
				}}
			>
				<svelte:component this={tool.icon} class="icon" />
			</button>
		{/each}
	</div>
	<div class="layer active" style="--active-tool-index: {activeToolIndex};">
		{#each TOOLS as tool, index (tool)}
			<button
				class="button"
				in:scale|global={{ duration: 400, delay: 40 * index }}
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
                    calc((3 - var(--active-tool-index)) * (40px + 4px)) /* right side offset from right */
                    0
                    calc(var(--active-tool-index) * (40px + 4px)) /* left side offset from left */
                    round 8px
				);
				transition: clip-path 0.4s;
				background: var(--primary-0);

				.button {
					:global(.icon) {
						color: var(--white-const);
					}
				}
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

					&:hover {
						color: var(--white-const);
					}
				}
			}
		}
	}
</style>
