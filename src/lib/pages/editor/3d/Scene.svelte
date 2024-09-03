<script lang="ts">
	import { useThrelte } from '@threlte/core';
	import Camera from './Camera.svelte';
	import Effects from './Effects.svelte';
	import { interactivity } from '@threlte/extras';
	import Walls from './Walls/Walls.svelte';
	import Player from './Player.svelte';
	import { canvas } from '$lib/shared/store/canvas';
	import { editorMode } from '$lib/shared/store/editorMode';
	import Furniture from './Furniture/Furniture.svelte';
	import Floor from './Floor/Floor.svelte';
	import { useRapier } from '@threlte/rapier';
	import { shadows, softShadows } from '$lib/shared/store/performanceSettings/shadows';
	import {
		ambientOcclusion,
		antiAliasing,
		bloom,
		noise,
		postProcessing
	} from '$lib/shared/store/performanceSettings/postProcessing';
	import {
		postProcessingDegraded,
		degradePostProcessing
	} from '$lib/shared/store/performanceSettings/degradeQualityOnRerender';
	import Sky from './Sky/Sky.svelte';

	const { invalidate, scene, renderer, camera, dpr } = useThrelte();

	$canvas = renderer.domElement;

	// todo: fix MASSIVE lags
	interactivity();

	function recompile() {
		scene.traverse((o) => {
			const object = o;
			// @ts-ignore
			if (object.material) {
				// @ts-ignore
				renderer?.properties.remove(object.material);

				// @ts-ignore
				object.material.dispose?.();
			}
		});
		if (renderer?.info.programs) renderer.info.programs.length = 0;
		renderer?.compile(scene, camera.current);
	}

	softShadows.subscribe(recompile);

	shadows.subscribe(() => {
		recompile();
		invalidate();
	});

	dpr.subscribe(invalidate);

	noise.subscribe(invalidate);
	bloom.subscribe(invalidate);
	ambientOcclusion.subscribe(invalidate);
	antiAliasing.subscribe(invalidate);

	const { pause, resume } = useRapier();

	$: if ($editorMode === 'firstPerson') {
		resume();
	} else {
		pause();
	}

	$: enablePostprocessing =
		$postProcessing &&
		(($degradePostProcessing && !$postProcessingDegraded) || !$degradePostProcessing);
</script>

{#if $editorMode === 'thirdPerson'}
	<Camera />
{/if}

{#if enablePostprocessing}
	{#key $dpr}
		<Effects />
	{/key}
{/if}

<Sky />

<Walls />
<Floor />

<Furniture />

{#if $editorMode === 'firstPerson'}
	<Player position={[-4, 4, -4]} />
{/if}
