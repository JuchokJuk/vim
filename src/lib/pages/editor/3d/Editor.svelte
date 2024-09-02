<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { World } from '@threlte/rapier';

	import { shadows } from '$lib/shared/store/performanceSettings/shadows';
	import { resolution } from '$lib/shared/store/performanceSettings/resolution';
	import { resolutionDegradation } from '$lib/shared/store/performanceSettings/degradeQualityOnRerender';

	import Scene from './Scene.svelte';

	let devicePixelRatio = 1;

	$: dpr = devicePixelRatio * $resolutionDegradation * $resolution;
</script>

<svelte:window bind:devicePixelRatio />

<Canvas
	rendererParameters={{
		powerPreference: 'high-performance',
		antialias: true,
		stencil: false,
		depth: true,
		logarithmicDepthBuffer: true
	}}
	shadows={$shadows}
	{dpr}
>
	<World>
		<Scene />
	</World>
</Canvas>
