<script lang="ts">
	import { useThrelte } from '@threlte/core';
	import Camera from './Camera.svelte';
	import Sky from './Sky.svelte';
	import Effects from './Effects.svelte';
	import { performanceSettings } from '$lib/store/performanceSettings';
	import { interactivity, SoftShadows } from '@threlte/extras';

	import Walls from './Walls/Walls.svelte';
	import Player from './Player.svelte';
	import { canvas } from '$lib/store/canvas';
	import { editorMode } from '$lib/store/editorMode';
	import Furniture from './Furniture/Furniture.svelte';
	import Ground from './Ground.svelte';

	const { invalidate, scene, renderer, camera } = useThrelte();
	$canvas = renderer.domElement;

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

	let softShadowsEnabled =
		$performanceSettings.shadows.settings.softShadows.enabled &&
		$performanceSettings.shadows.enabled;

	$: {
		recompile();
		softShadowsEnabled =
			$performanceSettings.shadows.settings.softShadows.enabled &&
			$performanceSettings.shadows.enabled;
	}

	performanceSettings.subscribe(() => {
		invalidate();
	});
</script>

{#if $editorMode === 'thirdPerson'}
	<Camera />
{/if}

{#if $performanceSettings.postProcessing.enabled}
	<Effects />
{/if}

{#if softShadowsEnabled}
	<SoftShadows focus={0.75} />
{/if}

<Sky />

<Walls />
<Ground />

<Furniture />

{#if $editorMode === 'firstPerson'}
	<Player position={[-4, 4, -4]} />
{/if}
