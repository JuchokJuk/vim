<script lang="ts">
	import { playerController } from '$lib/store/playerController';
	import { onMount } from 'svelte';
	import SecondOrderDynamics from '$lib/utils/SecondOrderDynamics';

	function length(x: number, y: number) {
		return Math.sqrt(x ** 2 + y ** 2);
	}

	function getAngle(x: number, y: number) {
		return Math.atan2(y, x);
	}

	function signedDistanceRectangle(x: number, y: number, width: number, height: number) {
		const componentWiseEdgeDistanceX = Math.abs(x) - width;
		const componentWiseEdgeDistanceY = Math.abs(y) - height;

		const outsideDistance = length(
			Math.max(componentWiseEdgeDistanceX, 0),
			Math.max(componentWiseEdgeDistanceY, 0)
		);

		const insideDistance = Math.min(
			Math.max(componentWiseEdgeDistanceX, componentWiseEdgeDistanceY),
			0
		);

		return outsideDistance + insideDistance;
	}

	function calcSpeed(x: number, y: number) {
		return 1 + signedDistanceRectangle(x, y, 1, 1);
	}

	// smooth direction changing

	const directionXAnimation = new SecondOrderDynamics(32, 1, 0);
	const directionZAnimation = new SecondOrderDynamics(32, 1, 0);
	const speedBoostAnimation = new SecondOrderDynamics(32, 1, 0);

	// animiation loop

	let requestId: number | undefined;

	function loop() {
		const delta = (performance.now() - prevTime) * 0.0001;

		const movingZDirection = forward - backward;
		const movingXDirection = right - left;

		const directionX = directionXAnimation.update(delta, movingXDirection);
		const directionZ = directionZAnimation.update(delta, movingZDirection);

		const angle = getAngle(directionX, directionZ);
		const speed = calcSpeed(directionX, directionZ);

		const running = run || doubleForwardRun;

		const z = Math.sin(angle);
		const mul = z > 0 ? z : 0;

		const speedBoost = speedBoostAnimation.update(delta, running ? 0.5 : 0) * mul;

		$playerController.angle = angle;
		$playerController.speed = speed * (1 + speedBoost);
		$playerController.jump = jump;

		prevTime = performance.now();
		requestId = requestAnimationFrame(loop);
	}

	let prevTime: number;

	onMount(() => {
		prevTime = performance.now();
		requestId = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(requestId!);
		};
	});

	// controls

	let jump = false;
	let run = false;
	let doubleForwardRun = false;

	let forward = 0;
	let backward = 0;
	let left = 0;
	let right = 0;

	let forwardPressed = false;

	function onKeyDown(event: KeyboardEvent) {
		if (event.code === 'KeyS' || event.code === 'ArrowDown') backward = 1;
		if (event.code === 'KeyW' || event.code === 'ArrowUp') {
			forward = 1;
			if (forwardPressed) {
				doubleForwardRun = true;
			}
		}
		if (event.code === 'KeyA' || event.code === 'ArrowLeft') left = 1;
		if (event.code === 'KeyD' || event.code === 'ArrowRight') right = 1;
		if (event.code === 'Space') jump = true;
		if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') run = true;
	}

	function onKeyUp(event: KeyboardEvent) {
		if (event.code === 'KeyS' || event.code === 'ArrowDown') backward = 0;
		if (event.code === 'KeyW' || event.code === 'ArrowUp') {
			forward = 0;
			doubleForwardRun = false;
			forwardPressed = true;
			setTimeout(() => {
				forwardPressed = false;
			}, 200);
		}
		if (event.code === 'KeyA' || event.code === 'ArrowLeft') left = 0;
		if (event.code === 'KeyD' || event.code === 'ArrowRight') right = 0;
		if (event.code === 'Space') jump = false;
		if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
			run = false;
			doubleForwardRun = false;
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />
