<script lang="ts">
	import Toolbar from '$lib/pages/editor/Toolbar/Toolbar.svelte';
	import Editor from '$lib/pages/editor/3d/Editor.svelte';
	import EditorModes from '$lib/pages/editor/EditorModes.svelte';
	import SkyControls from '$lib/pages/editor/SkyControls.svelte';
	import PerformanceControls from '$lib/pages/editor/PerformanceControls/PerformanceControls.svelte';
	import PlayerUI from '$lib/pages/editor/PlayerUI/PlayerUI.svelte';
	import { editorMode } from '$lib/shared/store/editorMode';
	import DelayedMount from '$lib/shared/UI/DelayedMount.svelte';

	export let data;

	console.log('areas:', data.layout.data.areas);
	console.log('lines:', data.layout.data.lines);
	console.log('vertices:', data.layout.data.vertices);
</script>

<svelte:head>
	<title>{data.project.name}</title>
</svelte:head>

<div class="absolute top-0 left-0 w-full h-full">
	<Editor />
</div>

<DelayedMount delay={400}>
	<div class="editor-modes top-xl">
		<EditorModes />
	</div>
	{#if $editorMode === 'firstPerson'}
		<PlayerUI />
	{:else}
		<div class="sky-controls top-xl left-xl">
			<SkyControls />
		</div>
		<Toolbar />
		<div class="absolute top-0 right-0 p-xl">
			<PerformanceControls />
		</div>
	{/if}
</DelayedMount>

<style lang="scss">
	.editor-modes {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.sky-controls {
		position: absolute;
	}
</style>
