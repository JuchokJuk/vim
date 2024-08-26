<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	export let openInfo: () => void;

	const gltf = useGltf('/models/kitchenTable-transformed.glb', { useDraco: true });
</script>

{#await gltf then gltf}
	<T.Mesh
		on:contextmenu={openInfo}
		castShadow
		receiveShadow
		geometry={gltf.nodes.Modelos_genéricos_22_Modelos_genéricos_22_320137_3_7184f46.geometry}
		material={gltf.materials['Balck wood']}
	/>
	<T.Mesh
		on:contextmenu={openInfo}
		castShadow
		receiveShadow
		geometry={gltf.nodes.Modelos_genéricos_22_Modelos_genéricos_22_320137_3_7184f46_1.geometry}
		material={gltf.materials.etqueta4234234235}
	/>
	<T.Group position={[0.06, 0.78, -0.05]} rotation={[Math.PI, -0.83, Math.PI]}>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh010.geometry}
			material={gltf.materials['Material #1114.001']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh010_1.geometry}
			material={gltf.materials['vela.001']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh010_2.geometry}
			material={gltf.materials['preto fosco.002']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh010_3.geometry}
			material={gltf.materials['fire.001']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh010_4.geometry}
			material={gltf.materials['Metal.001']}
		/>
	</T.Group>
	<T.Group position={[-0.03, 0.75, -0.07]} rotation={[Math.PI, -Math.PI / 4, Math.PI]}>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh005.geometry}
			material={gltf.materials['Planta 2526.001']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh005_1.geometry}
			material={gltf.materials['Terra vaso.001']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh005_2.geometry}
			material={gltf.materials['Vaso.002']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh005_3.geometry}
			material={gltf.materials['Base planta 342352.001']}
		/>
	</T.Group>
	<T.Group position={[0.07, 0.79, 0.08]} rotation={[-Math.PI, Math.PI / 4, -Math.PI]}>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh002.geometry}
			material={gltf.materials['Vaso.001']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh002_1.geometry}
			material={gltf.materials['bh0606_Madeira.002']}
		/>
	</T.Group>
	<T.Group position={[-0.35, 0.01, 0.36]} rotation={[-Math.PI, Math.PI / 4, -Math.PI]}>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes['129620003'].geometry}
			material={gltf.materials['bh0303_Madeira_preta.002']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes['129620003_1'].geometry}
			material={gltf.materials['bh2020_Madeira_Itapua.001']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes['129620003_2'].geometry}
			material={gltf.materials.MetalB}
		/>
	</T.Group>
	<T.Group position={[0.35, 0.01, 0.36]} rotation={[Math.PI, -Math.PI / 4, Math.PI]}>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes['129620003'].geometry}
			material={gltf.materials['bh0303_Madeira_preta.002']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes['129620003_1'].geometry}
			material={gltf.materials['bh2020_Madeira_Itapua.001']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes['129620003_2'].geometry}
			material={gltf.materials.MetalB}
		/>
	</T.Group>
	<T.Group position={[0.35, 0.01, -0.35]} rotation={[0, -Math.PI / 4, 0]}>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes['129620003'].geometry}
			material={gltf.materials['bh0303_Madeira_preta.002']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes['129620003_1'].geometry}
			material={gltf.materials['bh2020_Madeira_Itapua.001']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes['129620003_2'].geometry}
			material={gltf.materials.MetalB}
		/>
	</T.Group>
	<T.Group position={[-0.34, 0.01, -0.34]} rotation={[0, Math.PI / 4, 0]}>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes['129620003'].geometry}
			material={gltf.materials['bh0303_Madeira_preta.002']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes['129620003_1'].geometry}
			material={gltf.materials['bh2020_Madeira_Itapua.001']}
		/>
		<T.Mesh
			on:contextmenu={openInfo}
			castShadow
			receiveShadow
			geometry={gltf.nodes['129620003_2'].geometry}
			material={gltf.materials.MetalB}
		/>
	</T.Group>
{/await}
