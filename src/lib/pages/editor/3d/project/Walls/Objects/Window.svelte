<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	export let size: { x: number; y: number; z: number };
	export let flip: boolean;

	const gltf = useGltf('/models/parametric/window.glb', { useDraco: true });
</script>

{#await gltf then gltf}
	<T.Mesh
		name="window001"
		geometry={gltf.nodes.window001.geometry}
		material={gltf.materials.ramy}
		morphTargetDictionary={gltf.nodes.window001.morphTargetDictionary}
		morphTargetInfluences={[size.x - 1, size.y - 1]}
		position={[-0.02, 0, 0]}
		rotation.y={Math.PI / 2 + (flip ? Math.PI : 0)}
	/>
{/await}
