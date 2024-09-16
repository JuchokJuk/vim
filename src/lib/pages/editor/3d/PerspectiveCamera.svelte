<script lang="ts">
	import { SCENE_SIZE } from '$lib/shared/constants/sceneSize';
	import { localRooms } from '$lib/shared/editorEngine/state/localProject/localRooms';
	import { cameraEnabled } from '$lib/shared/store/cameraEnabled';
	import { floor, walls } from '$lib/shared/store/dollhouse';
	import { frequentRerender } from '$lib/shared/store/performanceSettings/degradeQualityOnRerender';
	import { T, useThrelte } from '@threlte/core';
	import { onDestroy, onMount } from 'svelte';
	import type CameraControlsType from 'camera-controls';
	import {
		Object3D,
		PerspectiveCamera,
		Raycaster,
		Vector2,
		type Intersection,
		type Object3DEventMap
	} from 'three';

	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	import { getInitialCameraPosition } from './getInitialCameraPosition';
	import CameraControls from '$lib/shared/3d/CameraControls.svelte';

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
					//@ts-expect-error poor typings
					if (lastWall.material.userData.setOpacity) {
						//@ts-expect-error poor typings
						lastWall.material.userData.setOpacity(visible);
					}
					//@ts-expect-error poor typings
					if (wallsIntersections[0].object.material.userData.setOpacity) {
						//@ts-expect-error poor typings
						wallsIntersections[0].object.material.userData.setOpacity(transparent);
					}
					lastWall = wallsIntersections[0].object;
				}
			} else {
				//@ts-expect-error poor typings
				if (lastWall.material.userData.setOpacity) {
					//@ts-expect-error poor typings
					lastWall.material.userData.setOpacity(visible);
				}
				lastWall = undefined;
			}
		} else {
			if (
				(wallsIntersections.length && floorIntersections.length) ||
				wallsIntersections.length > 1
			) {
				//@ts-expect-error poor typings
				if (wallsIntersections[0].object.material.userData.setOpacity) {
					//@ts-expect-error poor typings
					wallsIntersections[0].object.material.userData.setOpacity(transparent);
				}
				lastWall = wallsIntersections[0].object;
			}
		}
	}

	function onWake() {
		$frequentRerender = true;
	}

	async function onSleep() {
		$frequentRerender = false;
		// invalidate();
	}

	let cameraControls: CameraControlsType;
	onMount(() => {
		const intialPosition = getInitialCameraPosition($localRooms.vertices);
		cameraControls.setLookAt(
			intialPosition.x + 8,
			8,
			-intialPosition.z + 8,
			intialPosition.x,
			0,
			-intialPosition.z
		);
	});

	onDestroy(() => {
		if (lastWall) {
			//@ts-expect-error poor typings
			lastWall.material.userData.setOpacity(visible);
			lastWall = undefined;
		}
	});
</script>

<T.PerspectiveCamera bind:ref={camera} fov={60} near={0.01} far={SCENE_SIZE * 2} makeDefault>
	<CameraControls
		bind:ref={cameraControls}
		enabled={$cameraEnabled}
		zoomToCursor
		minPolarAngle={0}
		maxPolarAngle={85 * DEG2RAD}
		minDistance={2.5}
		infinityDolly
		on:wake={onWake}
		on:update={castRay}
		on:sleep={onSleep}
	/>
</T.PerspectiveCamera>
