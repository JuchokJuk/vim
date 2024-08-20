<script>
	import { Group } from 'three';
	import { T, forwardEventHandlers } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	const gltf = useGltf('/models/door-transformed.glb', { useDraco: true });
</script>

{#await gltf then gltf}
	<T.Group position={[-0.41, 1.05, 0.06]}>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Handle.geometry}
			material={gltf.materials['Door Handle']}
			position={[0.77, -0.04, -0.02]}
			rotation={[Math.PI / 2, 0, 0]}
			scale={0.1}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Handle_Base.geometry}
			material={gltf.materials['Door Handle']}
			rotation={[Math.PI / 2, 0, 0]}
			scale={0.1}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Hinge_Door_Side002.geometry}
			material={gltf.materials['Door Handle']}
			position={[0, -0.87, 0]}
		/>
		<T.Group position={[0.41, -0.04, -0.02]}>
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube002.geometry} material={gltf.materials['Door Handle']} />
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube002_1.geometry} material={gltf.materials['Material.002']} />
		</T.Group>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Latch001.geometry}
			material={gltf.materials['Door Handle']}
			position={[0.41, -0.04, -0.02]}
		/>
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube001.geometry} material={gltf.materials['Material.003']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube001_1.geometry} material={gltf.materials['Material.003']} />
	</T.Group>
	<T.Group position={[0.41, 1.02, 0.04]} scale={[0, 0.1, 0.08]}>
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube003.geometry} material={gltf.materials['Door Handle']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube003_1.geometry} material={gltf.materials['Door Handle']} />
	</T.Group>
	<T.Group position={[0, 1.02, 0.04]}>
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube006.geometry} material={gltf.materials['Material.003']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube006_1.geometry} material={gltf.materials['Door Handle']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube006_2.geometry} material={gltf.materials['Material.004']} />
	</T.Group>
	<T.Mesh castShadow receiveShadow
		geometry={gltf.nodes.Hinge_Pin002.geometry}
		material={gltf.materials['Door Handle']}
		position={[-0.41, 0.19, 0.06]}
		scale={0.01}
	/>
{/await}
