<script lang="ts">
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';
	import { Box, Grid3X3, PersonStanding } from 'lucide-svelte';

	import { fly } from 'svelte/transition';

	const tools = [
		{
			name: '2d',
			icon: Grid3X3
		},
		{
			name: '3d',
			icon: Box
		},
		{
			name: 'firstPerson',
			icon: PersonStanding
		}
	];
</script>

<div class="card corners-lg editor-modes" transition:fly|global={{ duration: 200, y: -64 }}>
	<ToggleGroup {tools} color="neutral" activeToolIndex={1} />
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
