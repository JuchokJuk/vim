<script lang="ts">
	import { onMount } from 'svelte';
	import { playerController } from '$lib/shared/store/3d/playerController';
	import SecondOrderDynamics from '$lib/shared/utils/SecondOrderDynamics';
	import { joystick } from '$lib/shared/store/3d/joystick';

	const speedBoostAnimation = new SecondOrderDynamics(32, 1, 0);

	const r = 64;

	let velocityX = 0;
	let velocityY = 0;

	const velocityXAnimation = new SecondOrderDynamics(32, 1, 0);
	const velocityYAnimation = new SecondOrderDynamics(32, 1, 0);

	const xAnimation = new SecondOrderDynamics(32, 1, 0);
	const yAnimation = new SecondOrderDynamics(32, 1, 0);

	let circle: HTMLDivElement;
	let startX: number;
	let startY: number;

	let grabX: number;
	let grabY: number;

	let x = 0;
	let y = 0;

	let grabbing = false;

	let currentTouchId: number;

	function getAngle(x: number, y: number) {
		return Math.atan2(y, x);
	}

	function length(x: number, y: number) {
		return Math.sqrt(x ** 2 + y ** 2);
	}

	function grab(event: TouchEvent) {
		if (!grabbing) {
			currentTouchId = event.changedTouches[0].identifier;
			grabX = -x + event.touches[currentTouchId].clientX - startX;
			grabY = -y + event.touches[currentTouchId].clientY - startY;
			grabbing = true;
		}
	}

	function release(event: TouchEvent) {
		if (currentTouchId === event.changedTouches[0].identifier) {
			grabbing = false;
		}
	}

	function move(event: TouchEvent) {
		if (grabbing) {
			x = event.touches[currentTouchId].clientX - startX - grabX;
			y = event.touches[currentTouchId].clientY - startY - grabY;

			findIntersection();

			xAnimation.value = x;
			yAnimation.value = y;
		}
	}

	function findIntersection() {
		const angle = Math.atan2(-y, x);

		if (Math.sqrt(x ** 2 + y ** 2) > r) {
			x = r * Math.cos(angle);
			y = -r * Math.sin(angle);
		}
	}

	let prevTime: number;
	let requestId: number;

	function loop() {
		const currentTime = performance.now();
		const delta = (currentTime - prevTime) * 0.0001;

		if (!grabbing) {
			x = xAnimation.update(delta, 0);
			y = yAnimation.update(delta, 0);
			velocityX = velocityXAnimation.update(delta, 0);
			velocityY = velocityYAnimation.update(delta, 0);
		} else {
			velocityX = velocityXAnimation.update(delta, x / r);
			velocityY = velocityYAnimation.update(delta, y / r);
		}

		const angle = getAngle(velocityX, -velocityY);
		const speed = length(velocityX, velocityY);

		const running = -velocityY > 0;
		const mul = -velocityY > 0 ? -velocityY : 0;
		const speedBoost = speedBoostAnimation.update(delta, running ? 0.5 : 0) * mul;

		$playerController.angle = angle;
		$playerController.speed = speed * (1 + speedBoost);

		prevTime = currentTime;
		requestId = requestAnimationFrame(loop);
	}

	function resize() {
		const rect = circle.getBoundingClientRect();
		startX = rect.x + rect.width / 2;
		startY = rect.y + rect.height / 2;
	}

	onMount(() => {
		$joystick = circle;
		resize();

		prevTime = performance.now();
		requestId = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(requestId!);
		};
	});
</script>

<svelte:window on:touchmove={move} on:touchend={release} on:resize={resize} />

<div class="container" style={`--r: ${r}px`}>
	<!-- preventDefault removes delay https://stackoverflow.com/questions/63848298/touch-move-is-really-slow -->
	<div
		class="joystick"
		style={`transform: translate(${x}px, ${y}px)`}
		on:touchstart|preventDefault={grab}
		bind:this={circle}
	/>

	<!-- <div class="velocity" style={`transform: translate(${velocityX}px, ${velocityY}px)`} /> -->
</div>

<style lang="scss">
	.container {
		width: calc(2 * var(--r));
		height: calc(2 * var(--r));
		position: relative;

		display: flex;
		align-items: center;
		justify-content: center;

		border-radius: 50%;
		box-shadow: 0 0 0 8px white inset;

		.joystick {
			width: var(--r);
			height: var(--r);
			border-radius: 50%;
			background: white;
		}

		// .velocity {
		// 	pointer-events: none;
		// 	position: absolute;
		// 	bottom: calc(0.75 * var(--r));
		// 	left: calc(0.75 * var(--r));
		// 	width: calc(0.5 * var(--r));
		// 	height: calc(0.5 * var(--r));
		// 	border-radius: 50%;
		// 	background: #ff0000;
		// }
	}
</style>
