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

	function onChange() {
		$frequentRerender = true;
	}

	async function onEnd() {
		$frequentRerender = false;
		invalidate();
	}
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
	<OrbitControls
		enabled={$cameraEnabled}
		zoomToCursor
		maxZoom={512}
		minZoom={32}
		zoom0={32}
		minPolarAngle={0 * DEG2RAD}
		maxPolarAngle={0 * DEG2RAD}
		on:change={onChange}
		on:end={onEnd}
	/>
</T.OrthographicCamera>
