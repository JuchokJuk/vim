<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	export let size: { x: number; y: number; z: number };

	const gltf = useGltf('/models/parametric/door.glb', { useDraco: true });
</script>

{#await gltf then gltf}
	<T.Group rotation.y={Math.PI * -0.5}>
		<T.Mesh
			scale.y={size.y}
			scale.z={size.x}
			geometry={gltf.nodes.door.geometry}
			material={gltf.materials.wood}
			position={[0, 0, size.x / 2]}
		/>
		<T.Mesh
			scale.y={size.y}
			scale.x={size.z + 0.1}
			geometry={gltf.nodes.right.geometry}
			position={[0, 0, -size.x / 2]}
			material={gltf.materials.wood}
		/>
		<T.Mesh
			scale.y={size.y}
			scale.x={size.z + 0.1}
			geometry={gltf.nodes.left.geometry}
			position={[0, 0, size.x / 2]}
			material={gltf.materials.wood}
		/>
		<T.Mesh
			scale.x={size.z + 0.1}
			scale.z={(size.x + 0.2) / 1.2}
			geometry={gltf.nodes.top.geometry}
			material={gltf.materials.wood}
			position={[0, size.y, 0]}
		/>
		<T.Mesh
			geometry={gltf.nodes.hande.geometry}
			material={gltf.materials.metal}
			position={[0, Math.min(1.0, size.y / 2), 0.5]}
		/>
	</T.Group>
{/await}
