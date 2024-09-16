<script lang="ts">
	import { forwardEventHandlers, T, useParent, useThrelte, useTask } from '@threlte/core';
	import CameraControls from 'camera-controls';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { PerspectiveCamera, OrthographicCamera } from 'three';

	import {
		Vector2,
		Vector3,
		Vector4,
		Quaternion,
		Matrix4,
		Spherical,
		Box3,
		Sphere,
		Raycaster
	} from 'three';

	const subsetOfTHREE = {
		Vector2: Vector2,
		Vector3: Vector3,
		Vector4: Vector4,
		Quaternion: Quaternion,
		Matrix4: Matrix4,
		Spherical: Spherical,
		Box3: Box3,
		Sphere: Sphere,
		Raycaster: Raycaster
	};

	CameraControls.install({ THREE: subsetOfTHREE });

	const dispatch = createEventDispatcher();

	const parent = useParent();

	const { renderer, invalidate } = useThrelte();

	export let ref = new CameraControls(
		$parent as PerspectiveCamera | OrthographicCamera,
		renderer.domElement
	);

	useTask(
		(delta) => {
			if (ref.update(delta)) {
				invalidate();
			}
		},
		{ autoStart: true, autoInvalidate: false }
	);

	function wake() {
		dispatch('wake');
	}

	function update() {
		dispatch('update');
	}

	function sleep() {
		dispatch('sleep');
	}

	onMount(() => {
		ref.addEventListener('controlstart', wake);
		ref.addEventListener('update', update);
		ref.addEventListener('sleep', sleep);

		return () => {
			ref.removeEventListener('controlstart', wake);
			ref.removeEventListener('update', update);
			ref.removeEventListener('sleep', sleep);
		};
	});

	const component = forwardEventHandlers();
</script>

<T is={ref} let:ref {...$$restProps} bind:this={$component} on:change={invalidate}>
	<slot {ref} />
</T>
