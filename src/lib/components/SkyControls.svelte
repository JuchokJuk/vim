<script lang="ts">
	import { SunMedium, House } from 'lucide-svelte';
	import { sky } from '$lib/store/sky';
	import { DEG2RAD, RAD2DEG } from 'three/src/math/MathUtils.js';
	import { scale } from 'svelte/transition';

	const RADIUS = 32;

	let container: HTMLDivElement;
	let handle: HTMLDivElement;

	let dragging = false;

	let position = { x: 0, y: 0 };
	let dragPointOffset = { x: 0, y: 0 };

	function grab(event: PointerEvent) {
		dragging = true;

		const containerRect = container.getBoundingClientRect();
		const handleRect = handle.getBoundingClientRect();

		dragPointOffset.x = -position.x + event.clientX - containerRect.x - handleRect.width / 2;
		dragPointOffset.y = -position.y + event.clientY - containerRect.y - handleRect.height / 2;
	}

	function move(event: PointerEvent) {
		if (!dragging) return;

		const containerRect = container.getBoundingClientRect();
		const handleRect = handle.getBoundingClientRect();

		// Вычисляем новую позицию
		const newPositionX = event.clientX - containerRect.x - handleRect.width / 2 - dragPointOffset.x;
		const newPositionY =
			event.clientY - containerRect.y - handleRect.height / 2 - dragPointOffset.y;

		// Проверяем, чтобы новая позиция не выходила за пределы круга радиусом 32 пикселя
		const distanceFromCenter = Math.sqrt(newPositionX ** 2 + newPositionY ** 2);

		if (distanceFromCenter <= RADIUS) {
			position.x = newPositionX;
			position.y = newPositionY;
		} else {
			// Если позиция выходит за пределы, нормализуем вектор перемещения
			const angle = Math.atan2(newPositionY, newPositionX);
			position.x = Math.cos(angle) * RADIUS;
			position.y = Math.sin(angle) * RADIUS;
		}

		// Обновляем азимут и угол возвышения
		updateAzimuthAndElevation();
	}

	function updateAzimuthAndElevation() {
		// Вычисляем азимут
		$sky.azimuth = Math.atan2(position.y, position.x) * RAD2DEG; // Преобразуем радианы в градусы

		// Вычисляем угол возвышения: 90 градусов в центре, уменьшается к 0 по краям
		const distanceFromCenter = Math.sqrt(position.x ** 2 + position.y ** 2);
		$sky.elevation = 90 - (distanceFromCenter / RADIUS) * (90 - 10);
	}

	function release() {
		dragging = false;
	}
</script>

<svelte:window on:pointermove={move} on:pointerup={release} />

<div
	class="container card"
	style="--size: {RADIUS * 2}px"
	bind:this={container}
	transition:scale|global={{ duration: 200 }}
>
	<House class="house" />
	<div
		class="handle card"
		on:pointerdown={grab}
		bind:this={handle}
		style="transform: translate({position.x}px, {position.y}px);"
	>
		<SunMedium class="sun" />
	</div>
</div>

<style lang="scss">
	.container {
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		:global(.house) {
			width: 16px;
			height: 16px;
		}

		.handle {
			position: absolute;
			top: calc(-12px + var(--size) / 2);
			left: calc(-12px + var(--size) / 2);

			width: 24px;
			height: 24px;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			:global(.sun) {
				width: 16px;
				height: 16px;
			}
		}
	}
</style>
