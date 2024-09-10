<script lang="ts">
	import { SCENE_SIZE } from '$lib/shared/constants/sceneSize';
	import { T } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	import GridMaterial from './GridMaterial/GridMaterial.svelte';
</script>

<AutoColliders shape="trimesh" friction={0}>
	<T.Mesh rotation.x={Math.PI * -0.5} position.y={-0.01} receiveShadow>
		<GridMaterial />
		<T.PlaneGeometry args={[SCENE_SIZE, SCENE_SIZE]} />
	</T.Mesh>
</AutoColliders>
