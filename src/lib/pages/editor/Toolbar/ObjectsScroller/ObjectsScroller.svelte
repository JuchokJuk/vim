<script lang="ts">
	import { spring } from '$lib/shared/utils/spring';
	import { clamp, smoothstep } from 'three/src/math/MathUtils.js';
	import Object from './Object.svelte';
	import { scale } from 'svelte/transition';
	import { itemsCatalog } from '$lib/shared/editorEngine/state/server/itemsCatalog';

	export let itemSize: number;

	let scrollProgress = spring(0, { stiffness: 0.1, damping: 0.5 });

	function scroll(event: WheelEvent) {
		$scrollProgress = clamp(
			$scrollProgress - event.deltaY,
			-($itemsCatalog.data.length * itemSize - objectsContainer.getBoundingClientRect().width),
			0
		);
	}

	let pointerX = spring(0, { stiffness: 0.1, damping: 0.9 });

	let hover = spring(0, { stiffness: 0.1, damping: 0.9 });

	let objectsContainer: HTMLDivElement;

	function over() {
		$hover = 1;
	}

	function move(event: PointerEvent) {
		const objectsContainerX = objectsContainer.getBoundingClientRect().x;
		pointerX.set(event.clientX - objectsContainerX!);
	}

	function leave() {
		$hover = 0;
	}

	function scaleObject(objectIndex: number, scale: number, hover: number) {
		return smoothstep(Math.max(0, -Math.abs(objectIndex / scale) + 1), 0, 1) * hover;
	}

	function getScale(index: number, scrollProgress: number, pointerX: number, hover: number) {
		const scaleFadeSize = 1; // amount of scaled neighbors
		const scaleAmount = 1; // defaultScale + scaleAmount = resultScale
		const defaultScale = 1;
		const hoveredObjectPosition = index - (-scrollProgress + pointerX - itemSize / 2) / itemSize;

		return scaleObject(hoveredObjectPosition, scaleFadeSize, hover) * scaleAmount + defaultScale;
	}
</script>

<div
	bind:this={objectsContainer}
	class="objects-container"
	on:pointermove={move}
	on:pointerleave={leave}
	on:pointerover={over}
	style="
        --item-size: {itemSize}px;
    "
>
	<div class="objects-wrapper" on:wheel|passive={scroll}>
		<div class="objects" style="transform: translateX({$scrollProgress}px);">
			{#each $itemsCatalog.data as funritureItem, index (funritureItem)}
				<div
					in:scale|global={{
						duration: 200,
						delay: 40 * (4 + index + $scrollProgress / itemSize)
					}}
					out:scale|global={{
						duration: 200
					}}
				>
					<Object
						object={funritureItem}
						scale={getScale(index, $scrollProgress, $pointerX, $hover)}
						{itemSize}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.objects-container {
		user-select: none;
		position: relative;
		width: 100%;
		height: calc(var(--item-size));

		display: flex;
		align-items: center;

		.objects-wrapper {
			position: absolute;

			display: flex;
			align-items: center;

			width: 100%;
			height: calc(var(--item-size) + 24px);
			overflow: hidden;

			.objects {
				display: flex;
			}
		}
	}
</style>
