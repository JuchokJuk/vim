<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	export let openInfo: () => void;
	const gltf = useGltf('/models/plant-transformed.glb', { useDraco: true });
</script>

{#await gltf then gltf}
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.calathea_Leaves.geometry}
		material={gltf.materials.calathea_orbifolia_01}
		position={[-0.01, 0.19, 0]}
		rotation={[0, -0.4, 0]}
	/>
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Ceramic_pot.geometry}
		material={gltf.materials['Ceramic Glazed']}
		position={[0, 0.11, 0]}
	/>
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Plastic_pot.geometry}
		material={gltf.materials.Plastic}
		position={[0, 0.19, 0]}
	/>
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Soil.geometry}
		material={gltf.materials['Procedural Dirt']}
		position={[0, 0.19, 0]}
	/>
{/await}
