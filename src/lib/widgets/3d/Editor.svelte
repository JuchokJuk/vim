<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { resolution } from '$lib/shared/store/resolution';
	import { World } from '@threlte/rapier';
	import { getSettings, getOptions } from '$lib/shared/store/performanceSettings/getSettings';

	let devicePixelRatio = 1;

	const globalResolution = getSettings(['resolution']);
	const resolutionOptions = getOptions(['resolution']);

	$: dpr = devicePixelRatio * $resolution * resolutionOptions[$globalResolution];

	const shadows = getSettings(['shadows']);
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
