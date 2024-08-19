<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { performanceSettings } from '$lib/store/performanceSettings';
	import { resolution } from '$lib/store/resolution';
	import { World } from '@threlte/rapier';

	let devicePixelRatio = 1;

	$: dpr = devicePixelRatio * $resolution;

	$: shadows = $performanceSettings.shadows.enabled;
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
	{shadows}
	{dpr}
>
	<World>
		<Scene />
	</World>
</Canvas>
