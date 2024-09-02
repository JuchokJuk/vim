<script lang="ts">
	import { T } from '@threlte/core';
	import { calculatePolygon } from './calculatePolygon';
	import { BoxGeometry, Mesh, MeshStandardMaterial, RepeatWrapping, Texture } from 'three';
	import { CSG } from 'three-csg-ts';
	import { AutoColliders } from '@threlte/rapier';
	import { mergeVertices } from '$lib/shared/utils/shape/mergeVertices';
	import { useTexture } from '@threlte/extras';
	import { walls as wallsStore } from '$lib/shared/store/walls';
	import Door from './Objects/Door.svelte';
	import Window from './Objects/Window.svelte';
	import { extrudeShape } from '$lib/shared/utils/shape/extrudeShape';
	import { createShape } from '$lib/shared/utils/shape/createShape';
	import { shiftPoint } from '$lib/shared/utils/math/shiftPoint';
	import { layout } from '$lib/shared/store/layout';
	import type { LayoutData } from '$lib/shared/API/projects/layouts';

	function createWall(lineId: string, layoutData: LayoutData) {
		const line = layoutData.lines[lineId];
		const vertices = calculatePolygon(lineId, layoutData);

		if (vertices.length < 3) return;

		vertices.map((vertex) => {
			vertex.x *= 0.01;
			vertex.y *= 0.01;
		});

		const wallShape = createShape(vertices);
		const wallGeometry = extrudeShape(wallShape, line.properties.height.length * 0.01);

		let base: Mesh = new Mesh(wallGeometry);
		const entities: {
			model: any;
			position: { x: number; y: number; z: number };
			rotation: { x: number; y: number; z: number };
		}[] = [];

		// // CSG
		// if (wall?.entities) {
		// 	for (const entityKey in wall.entities) {
		// 		const entity = wall.entities[entityKey];

		// 		if (entity.cut) {
		// 			const cut = new Mesh(
		// 				new BoxGeometry(entity.cut.height, entity.cut.width, wall.thickness * 1.5)
		// 			);

		// 			const { x, y } = shiftPoint(
		// 				{ x: 0, y: 0 },
		// 				{ x: wall.end.x - wall.start.x, y: wall.end.y - wall.start.y },
		// 				entity.offsetX
		// 			);

		// 			cut.position.x = wall.start.x + x;
		// 			cut.position.y = wall.start.y + y;
		// 			cut.position.z = entity.cut.height / 2 + entity.offsetY + entity.cut.y;

		// 			cut.rotation.x = Math.PI * -0.5;
		// 			cut.rotation.z = Math.PI * -0.5;

		// 			cut.rotation.y = -Math.atan2(wall.end.y - wall.start.y, wall.end.x - wall.start.x);
		// 			cut.updateMatrixWorld();

		// 			const model = {
		// 				'/models/window.glb': Window,
		// 				'/models/door.glb': Door
		// 			}[entity.model];

		// 			entities.push({
		// 				model,
		// 				position: { x: wall.start.x + x, y: wall.start.y + y, z: entity.offsetY },
		// 				rotation: { x: cut.rotation.x, y: cut.rotation.y, z: cut.rotation.z }
		// 			});

		// 			base = CSG.subtract(base, cut);
		// 		}
		// 	}
		// }

		base.geometry = mergeVertices(base.geometry);

		return { object: base, entities };
	}

	function transform(texture: Texture) {
		texture.wrapS = RepeatWrapping;
		texture.wrapT = RepeatWrapping;
		texture.repeat.set(0.5, 0.5);
		return texture;
	}

	const color = useTexture('/textures/wall/baseColor.webp', { transform });
	const normal = useTexture('/textures/wall/normal.webp', { transform });

	const wallMaterial = new MeshStandardMaterial({
		color: '#F4EFE9',
		metalness: 0,
		roughness: 0.9
	});

	// todo: починить ререндер и пересчёт геометрии стены
	Promise.all([color, normal]).then(([color, normal]) => {
		wallMaterial.map = color;
		wallMaterial.normalMap = normal;
		wallMaterial.needsUpdate = true;
	});

	$: layoutData = $layout.data;

	$: console.log(layoutData);
</script>

<T.Group rotation.x={Math.PI * -0.5} bind:ref={$wallsStore}>
	{#each Object.keys(layoutData.lines) as lineId}
		{@const wall = createWall(lineId, layoutData)}

		{#if wall}
			<AutoColliders shape="trimesh" friction={0}>
				<T is={wall.object} castShadow receiveShadow material={wallMaterial} />
			</AutoColliders>
		{/if}

		<!-- {#each wall.entities as entity}
			<T.Group
				position={[entity.position.x, entity.position.y, entity.position.z]}
				rotation={[entity.rotation.x, entity.rotation.y, entity.rotation.z - Math.PI * 0.5]}
			>
				<svelte:component this={entity.model} />
			</T.Group>
		{/each} -->
	{/each}
</T.Group>
