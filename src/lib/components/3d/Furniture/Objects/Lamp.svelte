<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	export let openInfo: () => void;
	const gltf = useGltf('/models/lamp-transformed.glb', { useDraco: true });
</script>

{#await gltf then gltf}
	<T.PointLight intensity={10} color="yellow" />
	<T.Group position={[0, 0.4, 0]} on:contextmenu={openInfo}>
		<T.Mesh
			geometry={gltf.nodes.Bolt004.geometry}
			material={gltf.materials['screw material']}
			position={[0, -0.4, 0]}
		/>
		<T.Mesh
			geometry={gltf.nodes.Circle036.geometry}
			material={gltf.nodes.Circle036.material}
			position={[0, -0.4, 0]}
		/>
		<T.Group position={[0, -0.4, 0]}>
			<T.Mesh geometry={gltf.nodes.Circle026.geometry} material={gltf.materials['body material']} />
			<T.Mesh
				geometry={gltf.nodes.Circle026_1.geometry}
				material={gltf.materials['light material']}
			/>
		</T.Group>
		<T.Mesh
			geometry={gltf.nodes.Circle040.geometry}
			material={gltf.nodes.Circle040.material}
			position={[0, -0.4, 0]}
		>
			<T.Mesh geometry={gltf.nodes.Bolt005.geometry} material={gltf.materials['screw material']} />
		</T.Mesh>
		<T.Mesh
			geometry={gltf.nodes.Circle041.geometry}
			material={gltf.nodes.Circle041.material}
			position={[0, -0.4, 0]}
		>
			<T.Mesh geometry={gltf.nodes.Bolt009.geometry} material={gltf.materials['screw material']} />
		</T.Mesh>
		<T.Mesh
			geometry={gltf.nodes.Circle042.geometry}
			material={gltf.nodes.Circle042.material}
			position={[0, -0.4, 0]}
		>
			<T.Mesh geometry={gltf.nodes.Bolt010.geometry} material={gltf.materials['screw material']} />
		</T.Mesh>
	</T.Group>
	<T.Mesh
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Circle039.geometry}
		material={gltf.materials['body material']}
	/>
	<T.Mesh
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Circle043.geometry}
		material={gltf.materials['screw material']}
	/>
	<T.Mesh
		on:contextmenu={openInfo}
		geometry={gltf.nodes.Plane002.geometry}
		material={gltf.materials['body material']}
	/>
{/await}
