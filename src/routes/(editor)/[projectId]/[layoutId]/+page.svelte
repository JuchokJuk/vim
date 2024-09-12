<script lang="ts">
	import Toolbar from '$lib/pages/editor/Toolbar/Toolbar.svelte';
	import Editor from '$lib/pages/editor/3d/Editor.svelte';
	import EditorModes from '$lib/pages/editor/EditorModes.svelte';
	import SkyControls from '$lib/pages/editor/SkyControls.svelte';
	import PerformanceControls from '$lib/pages/editor/PerformanceControls/PerformanceControls.svelte';
	import PlayerUI from '$lib/pages/editor/PlayerUI/PlayerUI.svelte';
	import { editorMode } from '$lib/shared/store/editorMode';
	import DelayedMount from '$lib/shared/UI/DelayedMount.svelte';
	// import { furniture } from '$lib/shared/store/project/furniture.js';
	import { serverLayout } from '$lib/shared/editorEngine/state/serverProject.js';
	import { localItems } from '$lib/shared/editorEngine/state/localProject/localItems.js';
	import { serverToLocalLayout } from '$lib/shared/editorEngine/API/transform/global/serverToLocalLayout.js';
	import { localRooms } from '$lib/shared/editorEngine/state/localProject/localRooms.js';

	export let data;

	$serverLayout = data.layout;
	// $furniture = data.furniture;

	const { rooms, items } = serverToLocalLayout(data.layout);
	
	$localRooms = rooms;
	$localItems = items;
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
