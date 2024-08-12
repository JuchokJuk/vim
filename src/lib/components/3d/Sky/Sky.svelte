<script lang="ts">
	import { DEG2RAD, RAD2DEG } from 'three/src/math/MathUtils.js';
	import { T, useThrelte } from '@threlte/core';
	import { Stars } from '@threlte/extras';
	import { sky } from '$lib/store/sky';
	import { spring } from '$lib/utils/spring';
	import { SCENE_SIZE } from '$lib/constants/sceneSize';
	import { Fog } from 'three';
	import SkyBox from './SkyBox/SkyBox.svelte';
	import { getFogColor } from './getFogColor';

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
	$: y = radius * Math.sin($animatedElevation * DEG2RAD) - 16;
	$: z = radius * Math.cos($animatedElevation * DEG2RAD) * $animatedAzimuthCos;

	const { scene } = useThrelte();

	let skyColor = getFogColor($animatedElevation);

	$: {
		skyColor = getFogColor($animatedElevation);
		scene.fog!.color = skyColor;
	}

	scene.fog = new Fog(skyColor, 0, SCENE_SIZE * 0.5);
</script>

<SkyBox
	azimuth={Math.atan2($animatedAzimuthSin, $animatedAzimuthCos) * RAD2DEG}
	elevation={$animatedElevation}
/>

<T.DirectionalLight
	intensity={$animatedElevation / 90}
	position={[x, y, z]}
	castShadow
	shadow.mapSize.width={2048}
	shadow.mapSize.height={2048}
	shadow.camera.near={0.01}
	shadow.camera.far={SCENE_SIZE}
	shadow.camera.left={32}
	shadow.camera.right={-32}
	shadow.camera.top={32}
	shadow.camera.bottom={-32}
	shadow.bias={-0.001}
/>

<T is={$sky.sunMesh} position={[x, y, z]}>
	<T.SphereGeometry args={[4, 8, 8]} />
	<T.MeshBasicMaterial color={'white'} fog={false} />
</T>

<Stars opacity={1 - $animatedElevation / 45} factor={8} radius={SCENE_SIZE / 2} saturation={0.1} />
