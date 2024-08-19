<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	export let openInfo: () => void;
	const gltf = useGltf('/models/table-transformed.glb', { useDraco: true });
</script>

{#await gltf then gltf}
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Cube.geometry}
		material={gltf.materials['Oak Natural']}
		position={[0, 0.36, 0]}
		rotation={[Math.PI, 0, Math.PI]}
		scale={[1.05, 1, 1]}
	/>
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Cube001.geometry}
		material={gltf.materials['Plastic.001']}
		position={[-0.1, 0.14, 0]}
		rotation={[Math.PI, 0, Math.PI]}
		scale={[1.05, 1, 1]}
	/>
	<T.Group position={[0, 0.14, 0]}>
		<T.Mesh
			castShadow
			receiveShadow
			on:contextmenu={openInfo}
			geometry={gltf.nodes.Cube003_1.geometry}
			material={gltf.materials['Plastic.001']}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			on:contextmenu={openInfo}
			geometry={gltf.nodes.Cube003_2.geometry}
			material={gltf.materials['Oak Natural']}
		/>
	</T.Group>
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Cube003.geometry}
		material={gltf.materials['Plastic.001']}
		position={[-0.1, 0.14, 0]}
		rotation={[Math.PI, 0, Math.PI]}
		scale={[1.05, 1, 1]}
	/>
{/await}
