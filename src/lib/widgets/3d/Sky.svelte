<script lang="ts">
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	import { T, useThrelte } from '@threlte/core';
	import { sky } from '$lib/shared/store/sky';
	import { spring } from '$lib/shared/utils/spring';
	import { SCENE_SIZE } from '$lib/shared/constants/sceneSize';

	import { Color } from 'three';
	import { softShadows } from '$lib/shared/store/performanceSettings/shadows';

	const { scene } = useThrelte();
	scene.background = new Color('#FAFAFA');

	const radius = SCENE_SIZE * 0.5;

	const animatedElevation = spring($sky.azimuth, {
		stiffness: 0.1,
		damping: 0.9
	});

	const animatedAzimuthSin = spring(Math.sin($sky.elevation * DEG2RAD), {
		stiffness: 0.1,
		damping: 0.9
	});

	const animatedAzimuthCos = spring(Math.cos($sky.elevation * DEG2RAD), {
		stiffness: 0.1,
		damping: 0.9
	});

	$: $animatedAzimuthSin = Math.sin($sky.azimuth * DEG2RAD);
	$: $animatedAzimuthCos = Math.cos($sky.azimuth * DEG2RAD);
	$: $animatedElevation = $sky.elevation;

	$: x = radius * Math.cos($animatedElevation * DEG2RAD) * $animatedAzimuthSin;
	$: y = radius * Math.sin($animatedElevation * DEG2RAD);
	$: z = radius * Math.cos($animatedElevation * DEG2RAD) * $animatedAzimuthCos;

	$: bias = $softShadows ? -0.0001 : -0.0004;
</script>

<T.DirectionalLight
	intensity={1}
	position={[x, y, z]}
	castShadow
	shadow.mapSize.width={4096}
	shadow.mapSize.height={4096}
	shadow.camera.near={0.01}
	shadow.camera.far={SCENE_SIZE}
	shadow.camera.left={32}
	shadow.camera.right={-32}
	shadow.camera.top={32}
	shadow.camera.bottom={-32}
	shadow.bias={bias}
	color="#FFFFFF"
/>
