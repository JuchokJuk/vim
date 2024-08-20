<script lang="ts">
	import { T } from '@threlte/core';
	import { calculatePolygon } from './calculatePolygon';
	import {
		Shape,
		ExtrudeGeometry,
		BoxGeometry,
		Mesh,
		MeshPhysicalMaterial,
		RepeatWrapping,
		Texture,
		Object3D,
		Vector4,
		Vector3,
		Euler
	} from 'three';
	import { walls, type Wall } from './walls';

	import { CSG } from 'three-csg-ts';
	import { AutoColliders } from '@threlte/rapier';

	import { mergeVertices } from './mergeVertices';
	import { useTexture } from '@threlte/extras';
	import { walls as wallsStore } from '$lib/store/walls';
	import Door from './Objects/Door.svelte';

	// Функция, создающая 2D-контур для стены
	function createWallShape(vertices: { x: number; y: number }[]): Shape {
		const shape = new Shape();
		shape.moveTo(vertices[0].x, vertices[0].y);
		for (let i = 1; i < vertices.length; i++) {
			shape.lineTo(vertices[i].x, vertices[i].y);
		}
		shape.lineTo(vertices[0].x, vertices[0].y); // замыкаем контур
		return shape;
	}

	// Создание 3D-геометрии стены через экструзию
	function createWall3D(vertices: { x: number; y: number }[], height: number) {
		const shape = createWallShape(vertices);
		const extrudeSettings = {
			depth: height,
			bevelEnabled: false
		};
		return new ExtrudeGeometry(shape, extrudeSettings);
	}

	function shiftPoint(
		x: number,
		y: number,
		vx: number,
		vy: number,
		d: number
	): { x: number; y: number } {
		// Находим длину вектора направления
		const length = Math.sqrt(vx * vx + vy * vy);

		// Нормализуем вектор направления
		const unitVx = vx / length;
		const unitVy = vy / length;

		// Вычисляем смещение по каждой оси
		const shiftX = unitVx * d;
		const shiftY = unitVy * d;

		// Новые координаты точки
		const newX = x + shiftX;
		const newY = y + shiftY;

		return { x: newX, y: newY };
	}

	function createWall(wallId: string, walls: Record<string, Wall>) {
		const wall = walls[wallId];
		const vertices = calculatePolygon(wallId, walls);
		let wallGeometry = createWall3D(vertices, wall.height);

		let base: Mesh = new Mesh(wallGeometry);
		const entities: {
			model: any;
			position: { x: number; y: number; z: number };
			rotation: { x: number; y: number; z: number };
		}[] = [];

		// CSG
		if (wall?.entities) {
			for (const entityKey in wall.entities) {
				const entity = wall.entities[entityKey];

				if (entity.cut) {
					const cut = new Mesh(
						new BoxGeometry(entity.cut.height, entity.cut.width, wall.thickness * 1.5)
					);

					const { x, y } = shiftPoint(
						0,
						0,
						wall.end.x - wall.start.x,
						wall.end.y - wall.start.y,
						entity.offsetX
					);

					cut.position.x = wall.start.x + x;
					cut.position.y = wall.start.y + y;
					cut.position.z = entity.cut.height / 2 + entity.offsetY + entity.cut.y;

					cut.rotation.x = Math.PI * -0.5;
					cut.rotation.z = Math.PI * -0.5;

					cut.rotation.y = -Math.atan2(wall.end.y - wall.start.y, wall.end.x - wall.start.x);
					cut.updateMatrixWorld();

					if (entity.model === '/models/door.glb') {
						entities.push({
							model: Door,
							position: { x: cut.position.x, y: cut.position.y, z: cut.position.z },
							rotation: { x: cut.rotation.x, y: cut.rotation.y, z: cut.rotation.z }
						});
					}

					base = CSG.subtract(base, cut);
				}
			}
		}

		base.geometry = mergeVertices(base.geometry);

		console.log(entities);
		return { object: base, entities };
	}

	function transform(texture: Texture) {
		texture.wrapS = RepeatWrapping;
		texture.wrapT = RepeatWrapping;
		texture.repeat.set(0.5, 0.5);
		return texture;
	}

	const color = useTexture('/textures/wall/baseColor.webp', { transform });
	// const roughness = useTexture('/textures/wall/roughness.webp', { transform });
	const normal = useTexture('/textures/wall/normal.webp', { transform });

	const wallVerticalMaterial = new MeshPhysicalMaterial({
		color: '#F4EFE9',
		metalness: 0,
		roughness: 0.9,
		opacity: 1,
		transparent: true
	});

	// const wallHorizontalMaterial = new MeshPhysicalMaterial({
	// 	color: '#141312',
	// 	roughness: 0.9,
	// 	metalness: 0.0
	// });

	$: {
		if ($color) wallVerticalMaterial.map = $color;
		// if ($roughness) wallVerticalMaterial.roughnessMap = $roughness;
		if ($normal) wallVerticalMaterial.normalMap = $normal;
		wallVerticalMaterial.needsUpdate = true;
	}

	// const wallMaterials = [
	// 	wallHorizontalMaterial,
	// 	wallVerticalMaterial,
	// 	wallVerticalMaterial,
	// 	wallVerticalMaterial
	// ];

	const wallMaterials = wallVerticalMaterial;
</script>

<T.Group rotation.x={Math.PI * -0.5} bind:ref={$wallsStore}>
	{#each Object.keys(walls) as wallId}
		{@const wall = createWall(wallId, walls)}

		<AutoColliders shape="trimesh" friction={0}>
			<T is={wall.object} castShadow receiveShadow>
				<T.MeshPhysicalMaterial
					color="#F4EFE9"
					metalness={0}
					roughness={0.9}
					opacity={1}
					transparent
				/>
			</T>
		</AutoColliders>

		{#each wall.entities as entity}
			<T.Group
				position={[entity.position.x, entity.position.y, entity.position.z - 1]}
				rotation={[entity.rotation.x, entity.rotation.y, entity.rotation.z - Math.PI * 0.5]}
			>
				<svelte:component this={entity.model} />
			</T.Group>
		{/each}
	{/each}
</T.Group>
