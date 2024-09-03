<script lang="ts">
	import Toolbar from '$lib/pages/editor/Toolbar/Toolbar.svelte';
	import Editor from '$lib/pages/editor/3d/Editor.svelte';
	import EditorModes from '$lib/pages/editor/EditorModes.svelte';
	import SkyControls from '$lib/pages/editor/SkyControls.svelte';
	import PerformanceControls from '$lib/pages/editor/PerformanceControls/PerformanceControls.svelte';
	import PlayerUI from '$lib/pages/editor/PlayerUI/PlayerUI.svelte';
	import { editorMode } from '$lib/shared/store/editorMode';
	import DelayedMount from '$lib/shared/UI/DelayedMount.svelte';
	import { layout } from '$lib/shared/store/layout.js';

	export let data;

	$layout = data.layout;
</script>

<svelte:head>
	<title>{data.project.name} – VIM</title>
</svelte:head>

<div class="absolute top-0 left-0 w-full h-full">
	<Editor />
</div>

<DelayedMount delay={400}>
	<div class="editor-modes absolute top-xl">
		<EditorModes />
	</div>
	{#if $editorMode === 'firstPerson'}
		<PlayerUI />
	{:else}
		<div class="absolute top-xl left-xl">
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
		left: 50%;
		transform: translateX(-50%);
	}
</style>
