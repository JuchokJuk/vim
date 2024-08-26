<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	export let openInfo: () => void;

	const gltf = useGltf('/models/kitchen-transformed.glb', { useDraco: true });
</script>

{#await gltf then gltf}
	<T.Mesh
		on:contextmenu={openInfo}
		castShadow
		receiveShadow
		geometry={gltf.nodes.Top_doors.geometry}
		material={gltf.materials.gray}
	/>
	<T.Group position={[0, 0.89, -0.03]}>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh.geometry}
			material={gltf.materials['Terrazo-balck']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh_1.geometry}
			material={gltf.materials['Steel.001']}
		/>
	</T.Group>
	<T.Mesh
		on:contextmenu={openInfo}
		castShadow
		receiveShadow
		geometry={gltf.nodes.stand.geometry}
		material={gltf.nodes.stand.material}
	/>
	<T.Group position={[1.23, 0.89, -0.03]}>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Plane005.geometry}
			material={gltf.materials.black}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Plane005_1.geometry}
			material={gltf.materials['Gray-spec']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Plane005_2.geometry}
			material={gltf.materials.Steel}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Plane005_3.geometry}
			material={gltf.materials['Material.001']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Plane005_4.geometry}
			material={gltf.materials.panel}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Plane005_5.geometry}
			material={gltf.materials['black-rough']}
		/>
	</T.Group>
	<T.Mesh
		on:contextmenu={openInfo}
		castShadow
		receiveShadow
		geometry={gltf.nodes.Fauset.geometry}
		material={gltf.materials['Steel.001']}
		position={[-0.62, 0.9, -0.28]}
	/>
	<T.Group position={[0.6, 0.91, -0.03]}>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Plane002.geometry}
			material={gltf.materials.oven}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Plane002_1.geometry}
			material={gltf.materials.black}
		/>
	</T.Group>
	<T.Mesh
		on:contextmenu={openInfo}
		castShadow
		receiveShadow
		geometry={gltf.nodes.Dwon_doors.geometry}
		material={gltf.nodes.Dwon_doors.material}
	/>
	<T.Mesh
		on:contextmenu={openInfo}
		castShadow
		receiveShadow
		geometry={gltf.nodes.base.geometry}
		material={gltf.materials.white}
	/>
	<T.Mesh
		on:contextmenu={openInfo}
		castShadow
		receiveShadow
		geometry={gltf.nodes.Backplate.geometry}
		material={gltf.materials.Terrazo}
	/>
{/await}
