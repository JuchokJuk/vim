<script lang="ts">
	import { T } from '@threlte/core';
	import { useTexture } from '@threlte/extras';
	import { MeshStandardMaterial, RepeatWrapping, Texture, ShapeGeometry } from 'three';
	import { calculatePolygon } from './calculatePolygon';
	import { createShape } from '$lib/shared/utils/shape/createShape';
	import { floor } from '$lib/shared/store/3d/dollhouse';
	import {
		localRooms,
		type LocalRooms
	} from '$lib/shared/editorEngine/state/local/project/localRooms';

	function transform(texture: Texture) {
		texture.wrapS = RepeatWrapping;
		texture.wrapT = RepeatWrapping;
		texture.repeat.set(1, 1);
		return texture;
	}

	const color = useTexture('/textures/floor/baseColor.webp', { transform });
	const metallicRoughness = useTexture('/textures/floor/metallicRoughness.webp', { transform });
	const normal = useTexture('/textures/floor/normal.webp', { transform });

	const groundMaterial = new MeshStandardMaterial({
		color: '#F4EFE9'
	});

	Promise.all([color, metallicRoughness, normal]).then(([color, metallicRoughness, normal]) => {
		groundMaterial.map = color;
		groundMaterial.metalnessMap = metallicRoughness;
		groundMaterial.roughnessMap = metallicRoughness;
		groundMaterial.normalMap = normal;
		groundMaterial.needsUpdate = true;
	});

	function createAreaShape(areaId: string, localRooms: LocalRooms) {
		const vertices = calculatePolygon(areaId, localRooms);

		if (vertices.length < 3) return;

		return createShape(vertices);
	}
</script>

<T.Group bind:ref={$floor}>
	{#each Object.keys($localRooms.areas) as areaId}
		{@const areaShape = createAreaShape(areaId, $localRooms)}

		<T.Mesh rotation.x={Math.PI * -0.5} receiveShadow>
			<T is={groundMaterial} />
			<T.ShapeGeometry args={[areaShape]} />
		</T.Mesh>
	{/each}
</T.Group>
