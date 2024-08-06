<script lang="ts">
	import { clamp } from '$lib/utils/clamp';
	import { smoothstep } from '$lib/utils/smoothstep';
	import { spring } from 'svelte/motion';
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
	export let itemsPerScreen: number;

	const screenWidth = itemSize * itemsPerScreen;
	const maxScroll = objects.length * itemSize - screenWidth;

	let scrollProgress = spring(0, { stiffness: 0.1, damping: 0.5 });

	function scroll(event: WheelEvent) {
		$scrollProgress = clamp($scrollProgress - event.deltaY, -maxScroll, 0);
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
		return smoothstep(0, 1, Math.max(0, -Math.abs(objectIndex / scale) + 1)) * hover;
	}

	function getScale(index: number, scrollProgress: number, pointerX: number, hover: number) {
		const scaleFadeSize = 2; // amount of scaled neighbors
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
        --item-per-screen: {itemsPerScreen};
    "
>
	<div class="objects-wrapper" on:wheel|passive={scroll}>
		<div class="objects" style="transform: translateX({$scrollProgress}px);">
			{#each objects as object, index (object)}
				<div
					transition:scale|global={{
						duration: 400,
						delay: 40 * (4 + index + $scrollProgress / itemSize)
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
		position: relative;
		width: calc(var(--item-size) * var(--item-per-screen));
		height: calc(var(--item-size));

		display: flex;
		align-items: center;

		.objects-wrapper {
			position: fixed;

			display: flex;
			align-items: center;

			width: calc(var(--item-size) * var(--item-per-screen));
			height: calc(var(--item-size) + 32px);
			overflow: hidden;

			.objects {
				display: flex;
			}
		}
	}
</style>
