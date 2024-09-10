<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	const gltf = useGltf('/models/window-transformed.glb', { useDraco: true });
</script>

{#await gltf then gltf}
	<T.Group position={[1.22, 0.78, 0.25]} rotation={[0, 0, Math.PI / 2]}>
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.door001.geometry}
			material={gltf.materials['white vinyl']}
			position={[-0.03, 0.38, -0.16]}
			rotation={[0, 0, -Math.PI / 2]}
			scale={[1, 1.01, 1]}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.door002.geometry}
			material={gltf.materials['white vinyl']}
			position={[-0.03, 0.38, -0.16]}
			rotation={[0, 0, -Math.PI / 2]}
			scale={[1, 1.01, 1]}
		/>
	</T.Group>
	<T.Group position={[-1, 0.78, 0.25]} rotation={[0, 0, -Math.PI / 2]}>
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.door003.geometry}
			material={gltf.materials['white vinyl']}
			position={[0.03, 0.16, -0.16]}
			rotation={[0, 0, Math.PI / 2]}
			scale={[1, 1.01, 1]}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.door004.geometry}
			material={gltf.materials['white vinyl']}
			position={[0.03, 0.16, -0.16]}
			rotation={[0, 0, Math.PI / 2]}
			scale={[1, 1.01, 1]}
		/>
	</T.Group>
	<T.Mesh
		castShadow
		receiveShadow
		geometry={gltf.nodes.frame.geometry}
		material={gltf.materials['white vinyl']}
		position={[-0.33, 1.01, 0.07]}
	/>
	<T.Mesh
		castShadow
		receiveShadow
		geometry={gltf.nodes.door.geometry}
		material={gltf.materials['white vinyl']}
		position={[0, 0.74, 0.05]}
	/>
{/await}
