<script lang="ts">
	import { SCENE_SIZE } from '$lib/shared/constants/sceneSize';
	import { cameraEnabled } from '$lib/shared/store/cameraEnabled';
	import { floor, walls } from '$lib/shared/store/dollhouse';
	import { frequentRerender } from '$lib/shared/store/performanceSettings/degradeQualityOnRerender';
	import { T, useThrelte } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
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

	let camera: PerspectiveCamera;
	const raycaseter = new Raycaster();
	const pointer = new Vector2(0, 0);
	const wallsIntersections: Intersection<Object3D<Object3DEventMap>>[] = [];
	const floorIntersections: Intersection<Object3D<Object3DEventMap>>[] = [];

	let lastWall: Object3D | undefined;

	const transparent = 0.1;
	const visible = 1;

	// todo: cast shape in rapier
	function castRay() {
		wallsIntersections.length = 0;
		floorIntersections.length = 0;
		raycaseter.setFromCamera(pointer, camera);
		raycaseter.intersectObject($walls, true, wallsIntersections);
		raycaseter.intersectObject($floor, true, floorIntersections);

		if (lastWall) {
			if (
				(wallsIntersections.length && floorIntersections.length) ||
				wallsIntersections.length > 1
			) {
				if (wallsIntersections[0].object !== lastWall) {
					if (lastWall.material.userData.setOpacity) {
						lastWall.material.userData.setOpacity(visible);
					}
					if (wallsIntersections[0].object.material.userData.setOpacity) {
						wallsIntersections[0].object.material.userData.setOpacity(transparent);
					}
					lastWall = wallsIntersections[0].object;
				}
			} else {
				if (lastWall.material.userData.setOpacity) {
					lastWall.material.userData.setOpacity(visible);
				}
				lastWall = undefined;
			}
		} else {
			if (
				(wallsIntersections.length && floorIntersections.length) ||
				wallsIntersections.length > 1
			) {
				if (wallsIntersections[0].object.material.userData.setOpacity) {
					wallsIntersections[0].object.material.userData.setOpacity(transparent);
				}
				lastWall = wallsIntersections[0].object;
			}
		}
	}

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
	bind:ref={camera}
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
		on:change={castRay}
	/>
	<!-- on:change={castRay} -->
</T.PerspectiveCamera>
