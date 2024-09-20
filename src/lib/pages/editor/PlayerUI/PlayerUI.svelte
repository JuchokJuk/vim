<script lang="ts">
	import { touchScreen } from '$lib/shared/store/UI/touchScreen';
	import KeyboardControls from './KeyboardControls.svelte';
	import TouchControls from './TouchControls/TouchControls.svelte';

	import { joystick } from '$lib/shared/store/3d/joystick';
	import { scale } from 'svelte/transition';
	import { clamp } from 'three/src/math/MathUtils.js';
	import { cameraEnabled } from '$lib/shared/store/3d/cameraEnabled';
	import { playerController } from '$lib/shared/store/3d/playerController';

	function onPointerMove(event: PointerEvent) {
		if(!$cameraEnabled && $touchScreen) return;
		if (event.target === $joystick) return;

		const xh = event.movementX * 0.003;
		const yh = event.movementY * 0.003;

		$playerController.phi += -xh * 1;
		$playerController.theta = clamp($playerController.theta + -yh * 1, -Math.PI / 2, Math.PI / 2);
	}
</script>

<svelte:window on:pointermove={onPointerMove} />

{#if $touchScreen}
	<TouchControls />
{:else}
	<KeyboardControls />
{/if}
<div class="cursor" transition:scale|global={{ duration: 400 }} />

<style lang="scss">
	.cursor {
		background-color: white;

		mix-blend-mode: difference;
		width: 4px;
		height: 4px;
		border-radius: 2px;

		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
