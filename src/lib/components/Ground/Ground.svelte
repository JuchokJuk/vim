<script lang="ts">
	import { SCENE_SIZE } from '$lib/constants/sceneSize';
	import { T } from '@threlte/core';
</script>

<T.Mesh rotation.x={-Math.PI / 2} receiveShadow>
	<T.CircleGeometry args={[SCENE_SIZE / 2]} />
	<T.MeshPhysicalMaterial color="#FFFFFF" />
</T.Mesh>
