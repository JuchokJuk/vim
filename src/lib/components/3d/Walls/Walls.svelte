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
		Texture
	} from 'three';
	import { walls, type Wall } from './walls';

	import { CSG } from 'three-csg-ts';
	import { AutoColliders } from '@threlte/rapier';

	import { mergeVertices } from './mergeVertices';
	import { useTexture } from '@threlte/extras';

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

	function createWallMesh(wallId: string, walls: Record<string, Wall>) {
		const wall = walls[wallId];
		const vertices = calculatePolygon(wallId, walls);
		let wallGeometry = createWall3D(vertices, wall.height);

		let base: Mesh = new Mesh(wallGeometry);

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

					base = CSG.subtract(base, cut);
				}
			}
		}

		base.geometry = mergeVertices(base.geometry);

		return base;
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
		roughness: 0.9
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

<AutoColliders shape="trimesh" friction={0}>
	<T.Group rotation.x={Math.PI * -0.5}>
		{#each Object.keys(walls) as wallId}
			{@const wallMesh = createWallMesh(wallId, walls)}
			<T is={wallMesh} castShadow receiveShadow material={wallMaterials} />
		{/each}
	</T.Group>
</AutoColliders>
