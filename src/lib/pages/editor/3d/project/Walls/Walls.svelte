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
	import WallMaterial from './WallMaterial.svelte';
	import {
		localRooms,
		type LocalRooms
	} from '$lib/shared/editorEngine/state/localProject/localRooms';

	function createWall(lineId: string, localRooms: LocalRooms) {
		const line = localRooms.lines[lineId];
		const vertices = calculatePolygon(lineId, localRooms);

		if (vertices.length < 3) return;

		const wallShape = createShape(vertices);
		const wallGeometry = extrudeShape(wallShape, line.properties.height.length);

		let base: Mesh = new Mesh(wallGeometry);
		const entities: {
			model: any;
			size: { x: number; y: number; z: number };
			position: { x: number; y: number; z: number };
			rotation: { x: number; y: number; z: number };
		}[] = [];

		// CSG
		if (line?.holes) {
			for (const holeId of line.holes) {
				const hole = localRooms.holes[holeId];

				const cut = new Mesh(
					new BoxGeometry(
						hole.properties.height.length,
						hole.properties.width.length,
						line.properties.thickness.length
					)
				);

				const wallStartX = getLineEnding(lineId, 0, localRooms).x;
				const wallEndX = getLineEnding(lineId, 1, localRooms).x;
				const wallStartY = getLineEnding(lineId, 0, localRooms).y;
				const wallEndY = getLineEnding(lineId, 1, localRooms).y;

				const dx = wallEndX - wallStartX;
				const dy = wallEndY - wallStartY;

				const offset = Math.sqrt(dx ** 2 + dy ** 2);

				const { x, y } = shiftPoint(
					{ x: 0, y: 0 },
					{
						x: dx,
						y: dy
					},
					offset * hole.offset
				);

				let model;

				if (hole.type.includes('door')) model = Door;
				if (hole.type.includes('window')) model = Window;

				let offsetY = 0;

				if (hole.properties.altitude?.length) offsetY = hole.properties.altitude.length;

				cut.scale.x = 1.01;
				cut.scale.y = 1.01;
				cut.scale.z = 1.01;

				cut.position.x = wallStartX + x;
				cut.position.y = wallStartY + y;
				cut.position.z = (hole.properties.height.length) / 2 + offsetY;

				cut.rotation.x = Math.PI * -0.5;
				cut.rotation.z = Math.PI * -0.5;

				cut.rotation.y = -Math.atan2(dy, dx);
				cut.updateMatrixWorld();

				entities.push({
					model,
					size: {
						x: hole.properties.width.length,
						y: hole.properties.height.length,
						z: line.properties.thickness.length
					},
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
</script>

<T.Group rotation.x={Math.PI * -0.5} bind:ref={$wallsStore}>
	{#each Object.keys($localRooms.lines) as lineId}
		{@const wall = createWall(lineId, $localRooms)}

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
					<svelte:component this={entity.model} size={entity.size} />
				</T.Group>
			{/each}
		{/if}
	{/each}
</T.Group>
