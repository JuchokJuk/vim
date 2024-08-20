<script lang="ts">
	import { T } from '@threlte/core';
	import { BackSide, DoubleSide, FrontSide } from 'three';
</script>

<T.Mesh rotation.x={Math.PI * 0.5} position.x={-4} position.y={3} position.z={-4} castShadow>
	<T.PlaneGeometry args={[8, 8]} />
	<!-- side={true} нелегальное значение, но так потолок одновременно прозрачный сверху и даёт тень -->
	<T.MeshPhysicalMaterial color="lightgray" side={true} />
</T.Mesh>
