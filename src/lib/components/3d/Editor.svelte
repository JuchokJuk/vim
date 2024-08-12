<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { performanceSettings } from '$lib/store/performanceSettings';

	const basicRendererParameters = {
		powerPreference: 'high-performance',
		antialias: true,
		stencil: false,
		depth: true
	};

	const postProcessingRendererParameters = {
		powerPreference: 'high-performance',
		antialias: false,
		stencil: false,
		depth: false
	};

	$: rendererParameters = $performanceSettings.postProcessing.enabled
		? postProcessingRendererParameters
		: basicRendererParameters;

	$: shadows = $performanceSettings.shadows.enabled;
</script>

<Canvas {rendererParameters} {shadows}>
	<Scene />
</Canvas>
