<script lang="ts">
	import Toolbar from '$lib/widgets/Toolbar/Toolbar.svelte';
	import { onMount } from 'svelte';
	import Editor from '$lib/widgets/3d/Editor.svelte';
	import EditorModes from '$lib/widgets/EditorModes.svelte';
	import SkyControls from '$lib/widgets/SkyControls.svelte';
	import PerformanceControls from '$lib/widgets/PerformanceControls/PerformanceControls.svelte';
	import PlayerUI from '$lib/widgets/PlayerUI/PlayerUI.svelte';
	import { editorMode } from '$lib/shared/store/editorMode';

	let mounted = false;

	onMount(() => {
		setTimeout(() => {
			mounted = true;
		}, 400);
	});
</script>

<div class="container overflow-hidden relative h-full">
	<div class="editor absolute top-0 left-0 w-full h-full">
		<Editor />
	</div>

	{#if mounted}
		<div class="editor-modes top-xl">
			<EditorModes />
		</div>
		{#if $editorMode === 'firstPerson'}
			<PlayerUI />
		{:else}
			<div class="sky-controls top-xl left-xl">
				<SkyControls />
			</div>
			<div class="toolbar bottom-xl px-2xl">
				<Toolbar />
			</div>
			<div class="absolute top-0 right-0 p-xl">
				<PerformanceControls />
			</div>
		{/if}
	{/if}
</div>

<style lang="scss">
	.container {
		background: var(--surface-0);

		.editor {
			// z-index: 0;
		}

		.editor-modes {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}

		.sky-controls {
			position: absolute;
		}

		.toolbar {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			width: 100%;
			max-width: 600px;
		}
	}
</style>
