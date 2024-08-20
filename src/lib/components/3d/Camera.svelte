<script lang="ts">
	import { SCENE_SIZE } from '$lib/constants/sceneSize';
	import { cameraEnabled } from '$lib/store/cameraEnabled';
	import { performanceSettings } from '$lib/store/performanceSettings';
	import { resolution } from '$lib/store/resolution';
	import { touchScreen } from '$lib/store/touchScreen';

	import { T, useTask, useThrelte } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { get } from 'svelte/store';
	import { PerspectiveCamera, Raycaster, Vector2 } from 'three';

	import { DEG2RAD } from 'three/src/math/MathUtils.js';

	const { invalidate } = useThrelte();
	// todo: fix on-demand with damping https://github.com/mrdoob/three.js/issues/23090

	$: if (!$performanceSettings.lowResolutionOnCameraMove.enabled) $resolution = 1;

	let camera: PerspectiveCamera;
	// const raycaseter = new Raycaster();
	// const pointer = new Vector2(0, 0);
	// const intersections = [];
	// useTask(() => {
	// 	raycaseter.setFromCamera(pointer, camera);
	// 	raycaseter.intersectObjects($walls, false, intersections);
	// });
</script>

<T.PerspectiveCamera
	bind:ref={camera}
	position.x={-8}
	position.y={8}
	position.z={0}
	fov={60}
	near={0.01}
	far={SCENE_SIZE * 2}
	makeDefault
>
	<OrbitControls
		enabled={$cameraEnabled}
		enableDamping={!$touchScreen}
		zoomToCursor
		minPolarAngle={0}
		minDistance={1}
		maxDistance={SCENE_SIZE * 0.25}
		maxPolarAngle={85 * DEG2RAD}
		on:start={() => {
			if (get(performanceSettings).lowResolutionOnCameraMove.enabled) {
				resolution.set(0.25);
			}
		}}
		on:end={() => {
			if (get(performanceSettings).lowResolutionOnCameraMove.enabled) {
				resolution.set(1);
				invalidate();
			}
		}}
	/>
</T.PerspectiveCamera>
