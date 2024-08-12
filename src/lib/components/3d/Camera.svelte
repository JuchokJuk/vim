<script lang="ts">
	import { SCENE_SIZE } from '$lib/constants/sceneSize';
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
</script>

<T.PerspectiveCamera position={[0, 7, 18]} fov={60} near={0.01} far={SCENE_SIZE * 2 } makeDefault>
	<OrbitControls
		minDistance={1}
		maxDistance={SCENE_SIZE * 0.25}
		maxPolarAngle={85 * DEG2RAD}
		enableDamping
		target={[0, 2.5, 0]}
	/>
</T.PerspectiveCamera>
