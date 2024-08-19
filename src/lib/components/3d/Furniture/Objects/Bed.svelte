<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	export let openInfo: () => void;

	const gltf = useGltf('/models/bed.glb');
</script>

{#await gltf then gltf}
	<T.Mesh
		on:contextmenu={openInfo}
		castShadow
		receiveShadow
		geometry={gltf.nodes.bed.geometry}
		material={gltf.materials['Fabric 134.001']}
		position={[0, 0.44, 0]}
	/>
	<T.Mesh
		on:contextmenu={openInfo}
		castShadow
		receiveShadow
		geometry={gltf.nodes.blanket.geometry}
		material={gltf.materials['black blanket.001']}
		position={[0, 0.44, 0]}
	/>
	<T.Mesh
		on:contextmenu={openInfo}
		castShadow
		receiveShadow
		geometry={gltf.nodes.mattres.geometry}
		material={gltf.materials['mattres.bed01.001']}
		position={[0, 0.44, 0]}
	/>
	<T.Mesh
		on:contextmenu={openInfo}
		castShadow
		receiveShadow
		geometry={gltf.nodes.pillow.geometry}
		material={gltf.materials['bed 02 black pillow .001']}
		position={[0, 0.44, 0]}
	/>
	<T.Mesh
		on:contextmenu={openInfo}
		castShadow
		receiveShadow
		geometry={gltf.nodes.piping.geometry}
		material={gltf.materials['Fabric 134.001']}
		position={[0, 0.43, 0]}
	/>
{/await}
