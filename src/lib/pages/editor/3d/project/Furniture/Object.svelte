<script lang="ts">
	import { T } from '@threlte/core';
	import { Align, useGltf } from '@threlte/extras';

	export let url: string;
	export let openInfo: (event: Event) => void;
	const gltf = useGltf(url, { useDraco: true });

	gltf.then((gltf) => {
		gltf.scene.traverse(function (node) {
			// @ts-expect-error poor typings
			if (node.isMesh) {
				node.castShadow = true;
				node.receiveShadow = true;
			}
		});
	});
</script>

{#await gltf then gltf}
	<Align y={1}>
		<T is={gltf.scene.clone(true)} on:contextmenu={openInfo} />
	</Align>
{/await}
