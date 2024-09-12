<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { Vector3, Plane, Raycaster, Vector2, Group, Color, MeshBasicMaterial } from 'three';
	import type { Event } from './Event';
	import { frequentRerender } from '$lib/shared/store/performanceSettings/degradeQualityOnRerender';
	import { selectedObjects } from '$lib/shared/store/project/selectedObjects';
	import { theme } from '$lib/shared/store/UI/theme';
	import colors from '$lib/shared/styles/variables/colors/colors.module.scss';
	import { updateItem } from '$lib/shared/editorEngine/actions/updateItem';

	export let itemId: string;

	export let position: [number, number, number];
	export let floorPlane: Plane;

	export let dragging = false;
	export let rotation = 0;

	const { camera } = useThrelte();

	let selected = false;
	let group: Group;

	const planeIntersectPoint = new Vector3();
	const pointer = new Vector2();
	const raycaster = new Raycaster();

	const offset = new Vector2();

	let startRotation = rotation;
	let rotationOffset = 0;

	async function select(event: Event) {
		event.stopPropagation();
		$selectedObjects.clear();

		group.traverse((node) => {
			// @ts-expect-error poor typings
			if (node.isMesh) {
				$selectedObjects.add(node);
			}
		});

		$selectedObjects = $selectedObjects;

		selected = true;
	}

	function unselect() {
		selected = false;
	}

	function grab(event: Event) {
		if (event.nativeEvent.button === 2 || !selected) return;

		dragging = true;

		event.ray.intersectPlane(floorPlane, planeIntersectPoint);

		offset.x = planeIntersectPoint.x - position[0];
		offset.y = planeIntersectPoint.z - position[2];

		startRotation = rotation;
		rotationOffset = Math.atan2(
			position[0] - planeIntersectPoint.x,
			position[2] - planeIntersectPoint.z
		);

		// event.stopPropagation();
	}

	let draggingRotationHandle = false;

	function grabRotaionHandle() {
		draggingRotationHandle = true;
	}

	function move(event: PointerEvent) {
		if (dragging) {
			if (event.ctrlKey || draggingRotationHandle) {
				setRotation(event);
			} else {
				setPosition(event);
			}

			$frequentRerender = true;
		}
	}

	function setPosition(event: PointerEvent) {
		pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
		pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

		raycaster.setFromCamera(pointer, $camera);

		raycaster.ray.intersectPlane(floorPlane, planeIntersectPoint);

		position[0] = planeIntersectPoint.x - offset.x;

		position[2] = planeIntersectPoint.z - offset.y;
	}

	function setRotation(event: PointerEvent) {
		pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
		pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

		raycaster.setFromCamera(pointer, $camera);

		raycaster.ray.intersectPlane(floorPlane, planeIntersectPoint);

		offset.x = planeIntersectPoint.x - position[0];
		offset.y = planeIntersectPoint.z - position[2];

		rotation =
			Math.atan2(position[0] - planeIntersectPoint.x, position[2] - planeIntersectPoint.z) +
			startRotation -
			rotationOffset;
	}

	async function release() {
		if (!dragging) return;

		dragging = false;
		draggingRotationHandle = false;

		updateItem({ id: itemId, position, rotation });

		$frequentRerender = false;
	}

	const controlsMaterial = new MeshBasicMaterial({
		depthTest: false,
		transparent: true,
		color: new Color(colors[`${$theme}-text-0`])
	});

	$: controlsMaterial.color = new Color(colors[`${$theme}-text-0`]);
</script>

<svelte:window on:pointermove={move} on:pointerup={release} />

<T.Group
	{position}
	on:pointerdown={grab}
	on:click={select}
	on:pointermissed={unselect}
	rotation.y={rotation}
>
	<!-- todo: replace with HTML component + CSS mix-blend-mode: difference -->
	{#if selected}
		<T.Mesh renderOrder={Infinity} rotation.x={Math.PI * -0.5} material={controlsMaterial}>
			<T.CircleGeometry args={[0.2, 32]} />
		</T.Mesh>
		<T.Mesh
			renderOrder={Infinity}
			rotation.x={Math.PI * -0.5}
			material={controlsMaterial}
			on:pointerdown={grabRotaionHandle}
		>
			<T.RingGeometry args={[0.22, 0.3, 32]} />
		</T.Mesh>
	{/if}
	<T.Group bind:ref={group}>
		<slot />
	</T.Group>
</T.Group>
