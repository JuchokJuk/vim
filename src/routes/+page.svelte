<script lang="ts">
	import Toolbar from '$lib/components/Toolbar/Toolbar.svelte';
	import { onMount } from 'svelte';
	import Editor from '$lib/components/3d/Editor.svelte';
	import EditorModes from '$lib/components/EditorModes.svelte';
	import SkyControls from '$lib/components/SkyControls.svelte';
	import PerformanceControls from '$lib/components/PerformanceControls/PerformanceControls.svelte';

	let mounted = false;

	onMount(() => {
		setTimeout(() => {
			mounted = true;
		}, 400);
	});
</script>

<div class="container">
	<div class="editor">
		<Editor />
	</div>

	{#if mounted}
		<div class="editor-modes">
			<EditorModes />
		</div>
		<div class="sky-controls">
			<SkyControls />
		</div>
		<div class="toolbar">
			<Toolbar />
		</div>
		<div class="performance-controls">
			<PerformanceControls />
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		height: 100%;
		overflow: hidden;
		background: var(--surface-0);
		position: relative;

		.editor {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: 0;
		}

		.editor-modes {
			position: absolute;
			top: 16px;
			left: 50%;
			transform: translateX(-50%);
		}

		.sky-controls {
			position: absolute;
			bottom: 16px;
			right: 16px;
		}

		.toolbar {
			position: absolute;
			bottom: 16px;
			left: 50%;
			transform: translateX(-50%);
		}

		.performance-controls {
			position: absolute;
			top: 16px;
			right: 16px;
		}
	}
</style>
