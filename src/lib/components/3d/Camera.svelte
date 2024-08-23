<script lang="ts">
	import { SCENE_SIZE } from '$lib/constants/sceneSize';
	import { cameraEnabled } from '$lib/store/cameraEnabled';
	import { performanceSettings } from '$lib/store/performanceSettings';
	import { postprocessingEnabled } from '$lib/store/postprocessingEnabled';
	import { resolution } from '$lib/store/resolution';
	import { touchScreen } from '$lib/store/touchScreen';
	import { walls } from '$lib/store/walls';

	import { T, useTask, useThrelte } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { tick } from 'svelte';
	import { get } from 'svelte/store';
	import {
		Object3D,
		PerspectiveCamera,
		Raycaster,
		Vector2,
		type Intersection,
		type Object3DEventMap
	} from 'three';

	import { DEG2RAD } from 'three/src/math/MathUtils.js';

	const { invalidate } = useThrelte();
	// todo: fix on-demand with damping https://github.com/mrdoob/three.js/issues/23090

	$: if (!$performanceSettings.degradeQualityOnRerender.settings!.resolution.enabled) {
		$resolution = 1;
	}

	$: if (!$performanceSettings.degradeQualityOnRerender.settings!.postProcessing.enabled) {
		$postprocessingEnabled = true;
	}

	// let camera: PerspectiveCamera;
	// const raycaseter = new Raycaster();
	// const pointer = new Vector2(0, 0);
	// const intersections: Intersection<Object3D<Object3DEventMap>>[] = [];

	// let lastWall: Object3D;

	// function castRay() {
	// 	intersections.length = 0;
	// 	raycaseter.setFromCamera(pointer, camera);
	// 	raycaseter.intersectObject($walls, true, intersections);

	// 	if (lastWall) {
	// 		if (intersections.length) {
	// 			if (intersections[0].object !== lastWall) {
	// 				lastWall.material.opacity = 1;
	// 				intersections[0].object.material.opacity = 0.1;
	// 				lastWall = intersections[0].object;
	// 			}
	// 		} else {
	// 			lastWall.material.opacity = 1;
	// 			lastWall = undefined;
	// 		}
	// 	} else {
	// 		if (intersections.length) {
	// 			intersections[0].object.material.opacity = 0.1;
	// 			lastWall = intersections[0].object;
	// 		}
	// 	}
	// }

	function onChange() {
		if (get(performanceSettings).degradeQualityOnRerender.settings!.resolution.enabled) {
			resolution.set(0.125);
		}
		if (get(performanceSettings).degradeQualityOnRerender.settings!.postProcessing.enabled) {
			postprocessingEnabled.set(false);
		}
	}

	async function onEnd() {
		resolution.set(1);
		await tick();
		postprocessingEnabled.set(true);
		invalidate();
	}
</script>

<!-- bind:ref={camera} -->
<T.PerspectiveCamera
	position.x={-8}
	position.y={8}
	position.z={0}
	fov={60}
	near={0.01}
	far={SCENE_SIZE * 2}
	makeDefault
>
	<!-- enableDamping={!$touchScreen} -->
	<OrbitControls
		enabled={$cameraEnabled}
		zoomToCursor
		minPolarAngle={0}
		minDistance={1}
		maxDistance={SCENE_SIZE * 0.25}
		maxPolarAngle={85 * DEG2RAD}
		on:change={onChange}
		on:end={onEnd}
	/>
	<!-- on:change={castRay} -->
</T.PerspectiveCamera>
