<script lang="ts">
	import CameraControls from '$lib/shared/3d/CameraControls.svelte';
	import { SCENE_SIZE } from '$lib/shared/constants/sceneSize';
	import { cameraEnabled } from '$lib/shared/store/3d/cameraEnabled';
	import { frequentRerender } from '$lib/shared/store/3d/performanceSettings/degradeQualityOnRerender';
	import { T, useThrelte } from '@threlte/core';
	import { onMount } from 'svelte';
	import type CameraControlsType from 'camera-controls';

	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	import { getInitialCameraPosition } from './getInitialCameraPosition';
	import { localRooms } from '$lib/shared/editorEngine/state/local/project/localRooms';

	const { invalidate } = useThrelte();

	function onWake() {
		$frequentRerender = true;
	}

	async function onSleep() {
		$frequentRerender = false;
		invalidate();
	}

	let cameraControls: CameraControlsType;

	onMount(() => {
		const intialPosition = getInitialCameraPosition($localRooms.vertices);
		cameraControls.setLookAt(
			intialPosition.x,
			8,
			-intialPosition.z,
			intialPosition.x,
			0,
			-intialPosition.z
		);
		cameraControls.zoomTo(64, true);
	});
</script>

<T.OrthographicCamera
	position.x={0}
	position.y={8}
	position.z={0}
	zoom={32}
	near={0.01}
	far={SCENE_SIZE * 2}
	makeDefault
>
	<!-- todo: fix slow zoom https://github.com/yomotsu/camera-controls/issues/519 -->
	<CameraControls
		bind:ref={cameraControls}
		enabled={$cameraEnabled}
		dollyToCursor
		minPolarAngle={0 * DEG2RAD}
		maxPolarAngle={0 * DEG2RAD}
		maxZoom={512}
		minZoom={32}
		zoom={64}
		on:wake={onWake}
		on:sleep={onSleep}
	/>
	<!-- <OrbitControls
		enabled={$cameraEnabled}
		zoomToCursor
		maxZoom={512}
		minZoom={32}
		zoom0={32}
		minPolarAngle={0 * DEG2RAD}
		maxPolarAngle={0 * DEG2RAD}
		on:change={onChange}
		on:end={onEnd}
	/> -->
</T.OrthographicCamera>
