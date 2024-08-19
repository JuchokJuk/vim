<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	export let openInfo: () => void;

	const gltf = useGltf('/models/bed-transformed.glb', { useDraco: true });
</script>

{#await gltf then gltf}
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.bed.geometry}
		material={gltf.materials['Fabric 134.001']}
		position={[0, 0.44, 0]}
	/>
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.blanket.geometry}
		material={gltf.materials['black blanket.001']}
		position={[0, 0.44, 0]}
	/>
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.mattres.geometry}
		material={gltf.materials['mattres.bed01.001']}
		position={[0, 0.44, 0]}
	/>
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.pillow.geometry}
		material={gltf.materials['black blanket.001']}
		position={[0, 0.44, 0]}
	/>
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.piping.geometry}
		material={gltf.materials['Fabric 134.002']}
		position={[0, 0.43, 0]}
	/>
{/await}
