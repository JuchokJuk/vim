<script lang="ts">
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';
	import { canvas } from '$lib/store/canvas';
	import { editorMode } from '$lib/store/editorMode';

	import { Box, Grid3X3, PersonStanding } from 'lucide-svelte';

	import { fly } from 'svelte/transition';

	function enterFirstPerson() {
		$canvas.requestPointerLock();
	}

	function exitFirstPerson() {
		document.exitPointerLock();
	}

	let previousMode = $editorMode;

	$: activeItemIndex = items.findIndex((i) => i.name === $editorMode);

	const items = [
		{
			name: '2d',
			icon: Grid3X3,
			handler: () => {
				$editorMode = '2d';
				exitFirstPerson();
			}
		},
		{
			name: 'thirdPerson',
			icon: Box,
			handler: () => {
				$editorMode = 'thirdPerson';
				exitFirstPerson();
			}
		},
		{
			name: 'firstPerson',
			icon: PersonStanding,
			handler: () => {
				previousMode = $editorMode;
				$editorMode = 'firstPerson';
				enterFirstPerson();
			}
		}
	];

	function pointerLockChange() {
		if (document.pointerLockElement === $canvas) {
			$editorMode = 'firstPerson';
		} else {
			$editorMode = previousMode;
			if (document.fullscreenElement !== null) document.exitFullscreen();
		}
	}
</script>

<svelte:document on:pointerlockchange={pointerLockChange} />

<div class="card corners-lg editor-modes" transition:fly|global={{ duration: 200, y: -64 }}>
	<ToggleGroup {items} color="neutral" {activeItemIndex} />
</div>

<style lang="scss">
	.editor-modes {
		transition:
			transform 0.2s,
			box-shadow 0.2s;

		&:hover {
			transform: scale(1.02);
			@include elevated;
		}
	}
</style>
