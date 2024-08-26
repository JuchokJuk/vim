<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	export let openInfo: () => void;
	const gltf = useGltf('/models/closet-transformed.glb', { useDraco: true });
</script>

{#await gltf then gltf}
	<T.Mesh
		position={[0, 1.11, 0.29]}
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Cube020.geometry}
		material={gltf.materials['frame.001']}
	/>
	<T.Mesh
		position={[0, 1.11, 0.29]}
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Cube020_1.geometry}
		material={gltf.materials.metal}
	/>
	<T.Mesh
		position={[-0.57, 1.11, 0.27]}
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Cube021.geometry}
		material={gltf.materials['frame.001']}
	/>
	<T.Mesh
		position={[-0.57, 1.11, 0.27]}
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Cube021_1.geometry}
		material={gltf.materials.metal}
	/>
	<T.Mesh
		position={[0, 0.14, 0.3]}
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Cube019.geometry}
		material={gltf.materials.Oak}
	/>
	<T.Mesh
		position={[0, 0.14, 0.3]}
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Cube019_1.geometry}
		material={gltf.materials.metal}
	/>
	<T.Mesh
		position={[0.6, 1.4, 0]}
		rotation={[0, 0, -Math.PI / 2]}
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Cube014.geometry}
		material={gltf.materials['frame.001']}
	/>
	<T.Mesh
		position={[0.6, 1.4, 0]}
		rotation={[0, 0, -Math.PI / 2]}
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Cube014_1.geometry}
		material={gltf.materials.Oak}
	/>
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.rack.geometry}
		material={gltf.materials.metal}
		position={[0.3, 1.55, -0.04]}
	/>
{/await}
