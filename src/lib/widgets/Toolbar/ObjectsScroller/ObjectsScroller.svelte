<script lang="ts">
	import { spring } from '$lib/shared/utils/spring';
	import { clamp, smoothstep } from 'three/src/math/MathUtils.js';
	import Object from './Object.svelte';
	import { scale } from 'svelte/transition';

	const objects = [
		'bed.png',
		'bedKing.png',
		'bookCase.png',
		'booksCaseLarge.png',
		'chair.png',
		'closet1.png',
		'closet2.png',
		'cushionedChair.png',
		'handleChair.png',
		'lamp1.png',
		'lamp2.png',
		'plant.png',
		'sofa.png',
		'sofaDouble.png',
		'sofaLong.png',
		'stool.png',
		'table1.png',
		'table2.png',
		'table3.png',
		'vase1.png',
		'vase2.png'
	];

	export let itemSize: number;

	let scrollProgress = spring(0, { stiffness: 0.1, damping: 0.5 });

	function scroll(event: WheelEvent) {
		$scrollProgress = clamp(
			$scrollProgress - event.deltaY,
			-(objects.length * itemSize - objectsContainer.getBoundingClientRect().width),
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
			{#each objects as object, index (object)}
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
						src={object}
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
			height: calc(var(--item-size) + 32px);
			overflow: hidden;

			.objects {
				display: flex;
			}
		}
	}
</style>
