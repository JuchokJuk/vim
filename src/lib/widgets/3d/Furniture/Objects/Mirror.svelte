<script lang="ts">
	import { getSettings } from '$lib/shared/store/performanceSettings/getSettings';
	import { T, extend } from '@threlte/core';
	import { PlaneGeometry } from 'three';

	import { Reflector } from 'three/addons/objects/Reflector.js';

	extend({
		Reflector
	});

	export let openInfo: () => void;

	const realisticMirrors = getSettings(['realisticMirrors']);
</script>

<T.Mesh
	castShadow
	receiveShadow
	on:contextmenu={openInfo}
	position={[0, 1, 0]}
	rotation.y={-Math.PI / 2}
>
	<T.BoxGeometry args={[1, 2, 0.1]} />
	<T.MeshStandardMaterial color="gray" />
</T.Mesh>
{#if $realisticMirrors}
	<T.Reflector
		args={[
			new PlaneGeometry(1, 2),
			{
				clipBias: 0.003,
				textureWidth: window.innerWidth * window.devicePixelRatio,
				textureHeight: window.innerHeight * window.devicePixelRatio,
				color: 0xb5b5b5
			}
		]}
		position={[-0.06, 1, 0]}
		rotation.y={-Math.PI / 2}
		on:contextmenu={openInfo}
	/>
{:else}
	<T.Mesh
		castShadow
		receiveShadow
		on:contextmenu={openInfo}
		position={[-0.06, 1, 0]}
		rotation.y={-Math.PI / 2}
	>
		<T.PlaneGeometry args={[1, 2]} />
		<T.MeshStandardMaterial color={'white'} roughness={0.0} metalness={1} />
	</T.Mesh>
{/if}
