<script lang="ts">
	import { T } from '@threlte/core';
	import { calculatePolygon, getLineEnding } from './calculatePolygon';
	import { BoxGeometry, Mesh, MeshStandardMaterial, RepeatWrapping, Texture } from 'three';
	import { CSG } from 'three-csg-ts';
	import { AutoColliders } from '@threlte/rapier';
	import { mergeVertices } from '$lib/shared/utils/shape/mergeVertices';
	import { useTexture } from '@threlte/extras';
	import { walls as wallsStore } from '$lib/shared/store/dollhouse';
	import Door from './Objects/Door.svelte';
	import Window from './Objects/Window.svelte';
	import { extrudeShape } from '$lib/shared/utils/shape/extrudeShape';
	import { createShape } from '$lib/shared/utils/shape/createShape';
	import { shiftPoint } from '$lib/shared/utils/math/shiftPoint';
	import { layout } from '$lib/shared/store/layout';
	import type { LayoutData } from '$lib/shared/API/projects/layouts';
	import WallMaterial from './WallMaterial.svelte';

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

		// CSG
		if (line?.holes) {
			for (const holeId of line.holes) {
				const hole = layoutData.holes[holeId];
				console.log(hole);

				const cut = new Mesh(
					new BoxGeometry(
						hole.properties.height.length * 0.01,
						hole.properties.width.length * 0.01,
						line.properties.thickness.length * 0.01
					)
				);

				const wallStartX = getLineEnding(lineId, 0, layoutData).x * 0.01;
				const wallEndX = getLineEnding(lineId, 1, layoutData).x * 0.01;
				const wallStartY = getLineEnding(lineId, 0, layoutData).y * 0.01;
				const wallEndY = getLineEnding(lineId, 1, layoutData).y * 0.01;

				const dx = wallEndX - wallStartX;
				const dy = wallEndY - wallStartY;

				const offset = Math.sqrt(dx ** 2 + dy ** 2);

				const { x, y } = shiftPoint(
					{ x: 0, y: 0 },
					{
						x: dx,
						y: dy
					},
					offset / 2
				);

				let offsetY = 0;
				if (hole.properties.altitude?.length) offsetY = hole.properties.altitude.length * 0.01;

				cut.position.x = wallStartX + x;
				cut.position.y = wallStartY + y;
				cut.position.z = (hole.properties.height.length * 0.01) / 2 + offsetY;

				cut.rotation.x = Math.PI * -0.5;
				cut.rotation.z = Math.PI * -0.5;

				cut.rotation.y = -Math.atan2(dy, dx);
				cut.updateMatrixWorld();

				let model;

				if (hole.type.includes('door')) model = Door;
				if (hole.type.includes('window')) model = Window;

				entities.push({
					model,
					position: { x: wallStartX + x, y: wallStartY + y, z: offsetY },
					rotation: { x: cut.rotation.x, y: cut.rotation.y, z: cut.rotation.z }
				});

				base = CSG.subtract(base, cut);
			}
		}

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
				<T is={wall.object} castShadow receiveShadow>
					<WallMaterial />
				</T>
			</AutoColliders>

			{#each wall.entities as entity}
				<T.Group
					position={[entity.position.x, entity.position.y, entity.position.z]}
					rotation={[entity.rotation.x, entity.rotation.y, entity.rotation.z - Math.PI * 0.5]}
				>
					<svelte:component this={entity.model} />
				</T.Group>
			{/each}
		{/if}
	{/each}
</T.Group>
