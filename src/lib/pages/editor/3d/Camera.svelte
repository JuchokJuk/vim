<script lang="ts">
	import { SCENE_SIZE } from '$lib/shared/constants/sceneSize';
	import { cameraEnabled } from '$lib/shared/store/cameraEnabled';
	import { frequentRerender } from '$lib/shared/store/performanceSettings/degradeQualityOnRerender';

	import { touchScreen } from '$lib/shared/store/touchScreen';
	import { walls } from '$lib/shared/store/walls';

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
		$frequentRerender = true;
	}

	async function onEnd() {
		$frequentRerender = false;
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
