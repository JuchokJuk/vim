<script lang="ts">
	import { useThrelte } from '@threlte/core';
	import PerspectiveCamera from './PerspectiveCamera.svelte';
	import OrtographicCamera from './OrtographicCamera.svelte';
	import Effects from './Effects.svelte';
	import { interactivity } from '@threlte/extras';
	import Player from './Player.svelte';
	import { canvas } from '$lib/shared/store/canvas';
	import { editorMode } from '$lib/shared/store/editorMode';
	import { useRapier } from '@threlte/rapier';
	import { shadows, softShadows } from '$lib/shared/store/performanceSettings/shadows';
	import {
		ambientOcclusion,
		antiAliasing,
		bloom,
		noise,
	} from '$lib/shared/store/performanceSettings/postProcessing';
	import Sky from './Sky/Sky.svelte';
	import Project from './project/Project.svelte';
	import Grid from './Grid/Grid.svelte';

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
</script>

{#if $editorMode === 'thirdPerson'}
	<PerspectiveCamera />
{/if}

{#if $editorMode === 'firstPerson'}
	<Player position={[-4, 4, -4]} />
{/if}

{#if $editorMode === '2d'}
	<OrtographicCamera />
{/if}

<Grid />

<Sky />

<Project />

{#key $dpr}
	<Effects />
{/key}
