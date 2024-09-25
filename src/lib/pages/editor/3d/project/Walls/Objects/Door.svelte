<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	export let size: { x: number; y: number; z: number };
	export let flip: boolean;

	const gltf = useGltf('/models/parametric/door.glb', { useDraco: true });
</script>

{#await gltf then gltf}
	<T.Group rotation.y={flip ? Math.PI : 0}>
		<T.Mesh
			castShadow
			receiveShadow
			scale.y={size.y}
			scale.x={size.x}
			geometry={gltf.nodes.door.geometry}
			material={gltf.materials.wood}
			position={[size.x / 2, 0, 0]}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			scale.y={size.y}
			scale.z={size.z + 0.1}
			geometry={gltf.nodes.right.geometry}
			position={[-size.x / 2, 0, 0]}
			material={gltf.materials.wood}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			scale.y={size.y}
			scale.z={size.z + 0.1}
			geometry={gltf.nodes.left.geometry}
			position={[size.x / 2, 0, 0]}
			material={gltf.materials.wood}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			scale.x={(size.x + 0.2) / 1.2}
			scale.z={size.z + 0.1}
			geometry={gltf.nodes.top.geometry}
			material={gltf.materials.wood}
			position={[0, size.y, 0]}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.hande.geometry}
			material={gltf.materials.metal}
			position={[0.5, Math.min(1.0, size.y / 2), 0]}
		/>
	</T.Group>
	<!-- {:catch}
	<T.Mesh>
		<T.BoxGeometry args={[1, 1, 1]} />
		<T.MeshStandardMaterial color="red" />
	</T.Mesh> -->
{/await}
