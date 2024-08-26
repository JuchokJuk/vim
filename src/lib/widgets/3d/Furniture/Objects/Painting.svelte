<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	export let openInfo: () => void;
	const gltf = useGltf('/models/painting-transformed.glb', { useDraco: true });
</script>

{#await gltf then gltf}
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.frame.geometry}
		material={gltf.materials['Black wood.001']}
	/>
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Cube001.geometry}
		material={gltf.materials['Painting.001']}
	/>
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Cube001_1.geometry}
		material={gltf.materials['Paiting back.001']}
	/>
{/await}
