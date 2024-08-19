<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	export let openInfo: () => void;

	const gltf = useGltf('/models/chair.glb');
</script>

{#await gltf then gltf}
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Cube006.geometry}
		material={gltf.materials.Chair}
	/>
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Cube006_1.geometry}
		material={gltf.materials.Mat}
	/>
{/await}
