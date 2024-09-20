<script lang="ts">
	import { playerController } from '$lib/shared/store/3d/playerController';
	import triangle from './triangle.svg?raw';

	let currentTouchId: number;

	let pressed = false;

	function start(event: TouchEvent) {
		currentTouchId = event.changedTouches[0].identifier;
		pressed = true;
	}

	function end(event: TouchEvent) {
		if (event.changedTouches[0].identifier === currentTouchId) {
			pressed = false;
		}
	}

	$: {
		$playerController.jump = pressed;
	}
</script>

<button on:touchstart={start} on:touchend={end} class:pressed>
	{@html triangle}
</button>

<style lang="scss">
	button {
		border: none;
		background: none;
		display: block;

		transition: 0.2s transform;

		&.pressed {
			transform: scale(0.8);
		}

		:global(svg) {
			transform: rotate(-90deg);
		}
	}
</style>
