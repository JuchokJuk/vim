<script lang="ts">
	import Draggable from './Draggable/Draggable.svelte';
	// import Info from './Info.svelte';
	import { Plane, Vector3 } from 'three';
	import { cameraEnabled } from '$lib/shared/store/cameraEnabled';

	import Bed from './Objects/Bed.svelte';
	import Chair from './Objects/Chair.svelte';
	import Desk from './Objects/Desk.svelte';
	import Table from './Objects/Table.svelte';
	import Plant from './Objects/Plant.svelte';
	import Closet from './Objects/Closet.svelte';
	import Mirror from './Objects/Mirror.svelte';
	import Lamp from './Objects/Lamp.svelte';
	import Painting from './Objects/Painting.svelte';
	// import Kitchen from './Objects/Kitchen.svelte';
	// import KitchenTable from './Objects/KitchenTable.svelte';

	type Furniture = {
		component: any;
		position: [number, number, number];
		rotation: number;
		dragging: boolean;
		name: string;
	};

	const furniture: Furniture[] = [
		{
			component: Bed,
			position: [-1.8+17, 0, -6.5-4.6],
			rotation: 0,
			dragging: false,
			name: 'Кровать'
		},
		{
			component: Chair,
			position: [-1.15+17, 0, -4.5-4.6],
			rotation: 2.7,
			dragging: false,
			name: 'Стул'
		},
		{
			component: Desk,
			position: [-1.2+17, 0, -4-4.6],
			rotation: Math.PI,
			dragging: false,
			name: 'Стол'
		},
		{
			component: Table,
			position: [-0.5+17, 0, -7.5-4.6],
			rotation: Math.PI / 2,
			dragging: false,
			name: 'Столик'
		},
		{
			component: Plant,
			position: [-3.6+17, 0, -5.1-4.6],
			rotation: 0,
			dragging: false,
			name: 'Цветок'
		},
		{
			component: Closet,
			position: [-3.6+17, 0, -7.1-4.6],
			rotation: Math.PI * -1.5,
			dragging: false,
			name: 'Шкаф'
		},
		{
			component: Mirror,
			position: [-3.85+17, 0, -5.8-4.6],
			rotation: Math.PI,
			dragging: false,
			name: 'Зеркало'
		},
		{
			component: Lamp,
			position: [-2+17, 3, -6-4.6],
			rotation: Math.PI,
			dragging: false,
			name: 'Люстра'
		},
		{
			component: Painting,
			position: [-3+17, 1.75, -3.6-4.6],
			rotation: Math.PI / 2,
			dragging: false,
			name: 'Картина'
		}
		// {
		// 	component: Kitchen,
		// 	position: [-6.25, 0, -7.5],
		// 	rotation: 0,
		// 	dragging: false,
		// 	name: 'Кухня'
		// },
		// {
		// 	component: KitchenTable,
		// 	position: [-7, 0, -6],
		// 	rotation: 0,
		// 	dragging: false,
		// 	name: 'Кухонный столик'
		// }
	];

	const floorPlane = new Plane(new Vector3(0, 1, 0), 0);

	$: $cameraEnabled = furniture.reduce((a, b) => a && !b.dragging, true);
</script>

{#each furniture as item}
	<Draggable
		{floorPlane}
		bind:position={item.position}
		bind:rotation={item.rotation}
		bind:dragging={item.dragging}
	>
		<!-- <Info content={item.name} let:open> -->
		<!-- openInfo={open} -->
		<svelte:component
			this={item.component}
			openInfo={() => {
				console.log('todo: implement');
			}}
		/>
		<!-- </Info> -->
	</Draggable>
{/each}
