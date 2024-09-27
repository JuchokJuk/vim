<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { World } from '@threlte/rapier';

	import { shadows } from '$lib/shared/store/3d/performanceSettings/shadows';
	import { resolution } from '$lib/shared/store/3d/performanceSettings/resolution';
	import { resolutionDegradation } from '$lib/shared/store/3d/performanceSettings/degradeQualityOnRerender';

	import Scene from './Scene.svelte';
	import { shortcut } from '$lib/shared/utils/shortcut';

	import { history } from '$lib/shared/editorEngine/actions/History';

	let devicePixelRatio = 1;

	$: dpr = devicePixelRatio * $resolutionDegradation * $resolution;
</script>

<svelte:window
	bind:devicePixelRatio
	use:shortcut={[
		{ keys: ['Control', 'KeyZ'], callback: history.undo.bind(history) },
		{ keys: ['Control', 'KeyY'], callback: history.redo.bind(history) }
	]}
/>

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
