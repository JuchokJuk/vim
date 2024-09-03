<script lang="ts">
	import { layout } from '$lib/shared/store/layout';
	import { T } from '@threlte/core';
	import { useTexture } from '@threlte/extras';
	import { AutoColliders } from '@threlte/rapier';
	import { MeshStandardMaterial, RepeatWrapping, Texture } from 'three';
	import { calculatePolygon } from './calculatePolygon';
	import { createShape } from '$lib/shared/utils/shape/createShape';
	import { SCENE_SIZE } from '$lib/shared/constants/sceneSize';

	import GridMaterial from './GridMaterial/GridMaterial.svelte';
	import { floor } from '$lib/shared/store/dollhouse';

	function transform(texture: Texture) {
		texture.wrapS = RepeatWrapping;
		texture.wrapT = RepeatWrapping;
		texture.repeat.set(1, 1);
		return texture;
	}

	const color = useTexture('/textures/ground/baseColor.webp', { transform });
	const metallicRoughness = useTexture('/textures/ground/metallicRoughness.webp', { transform });
	const normal = useTexture('/textures/ground/normal.webp', { transform });

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

	function createAreaShape(areaId: string) {
		const vertices = calculatePolygon(areaId, layoutData);

		if (vertices.length < 3) return;

		vertices.map((vertex) => {
			vertex.x *= 0.01;
			vertex.y *= 0.01;
		});

		return createShape(vertices);
	}

	$: layoutData = $layout.data;
</script>

<AutoColliders shape="trimesh" friction={0}>
	<T.Mesh rotation.x={Math.PI * -0.5} position.y={-0.01} receiveShadow>
		<GridMaterial />
		<T.PlaneGeometry args={[SCENE_SIZE * 16, SCENE_SIZE * 16]} />
	</T.Mesh>
</AutoColliders>
<T.Group bind:ref={$floor}>
	{#each Object.keys(layoutData.areas) as areaId}
		{@const areaShape = createAreaShape(areaId)}

		<T.Mesh rotation.x={Math.PI * -0.5} receiveShadow>
			<T is={groundMaterial} />
			<T.ShapeGeometry args={[areaShape]} />
		</T.Mesh>
	{/each}
</T.Group>
