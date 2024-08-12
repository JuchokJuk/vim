<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { SphereGeometry } from 'three';
	import Camera from './Camera.svelte';
	import Sky from './Sky/Sky.svelte';
	import Effects from './Effects.svelte';
	import Ground from '../Ground/Ground.svelte';
	import { performanceSettings } from '$lib/store/performanceSettings';
	import { SoftShadows } from '@threlte/extras';
	import SampleRoom from './SampleRoom/SampleRoom.svelte';

	const { scene, renderer, camera } = useThrelte();
	const sphereGeo = new SphereGeometry(2.5, 32, 32);

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
</script>

<Camera />

{#if $performanceSettings.postProcessing.enabled}
	<Effects />
{/if}

{#if softShadowsEnabled}
	<SoftShadows focus={0.5} />
{/if}

<Sky />

<!-- <SampleRoom /> -->
<T.Mesh castShadow position.x={3} position.y={2.5}>
	<T is={sphereGeo} />
	<T.MeshPhysicalMaterial roughness={0.1} metalness={1} />
</T.Mesh>

<T.Mesh position.x={-3} castShadow position.y={2.5}>
	<T is={sphereGeo} />
	<T.MeshPhysicalMaterial />
</T.Mesh>

<Ground />
