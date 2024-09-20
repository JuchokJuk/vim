<script lang="ts">
	import ToggleGroup from '$lib/shared/UI/ToggleGroup.svelte';
	import { canvas } from '$lib/shared/store/3d/canvas';
	import { editorMode } from '$lib/shared/store/3d/editorMode';

	import { Box, Grid3X3, PersonStanding } from 'lucide-svelte';

	import { fly } from 'svelte/transition';

	function enterFirstPerson() {
		$canvas.requestPointerLock();
	}

	function exitFirstPerson() {
		document.exitPointerLock();
	}

	let previousMode = $editorMode;

	$: activeItemIndex = items.findIndex((i) => i.value === $editorMode);

	const items = [
		{
			value: '2d',
			icon: Grid3X3,
			handler: () => {
				$editorMode = '2d';
				exitFirstPerson();
			}
		},
		{
			value: 'thirdPerson',
			icon: Box,
			handler: () => {
				$editorMode = 'thirdPerson';
				exitFirstPerson();
			}
		},
		{
			value: 'firstPerson',
			icon: PersonStanding,
			handler: () => {
				previousMode = $editorMode;
				$editorMode = 'firstPerson';
				enterFirstPerson();
			}
		}
	];

	// todo: добавить задержку во время переключения
	function pointerLockChange() {
		if (document.pointerLockElement === $canvas) {
			$editorMode = 'firstPerson';
		} else {
			$editorMode = previousMode;
		}
	}
</script>

<svelte:document on:pointerlockchange={pointerLockChange} />

<div class="card rounded-lg p-xs editor-modes" transition:fly|global={{ duration: 200, y: -64 }}>
	<ToggleGroup {items} {activeItemIndex} color="neutral" />
</div>

<style lang="scss">
	.editor-modes {
		transition:
			transform 0.2s,
			box-shadow 0.2s;

		@include mouse-hover {
			transform: scale(1.02);
			@include elevated;
		}
	}
</style>
