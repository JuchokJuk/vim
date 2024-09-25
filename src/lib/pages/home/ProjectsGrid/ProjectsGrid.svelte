<script lang="ts">
	import type { Project as ProjectType } from '$lib/shared/editorEngine/API/queries/projects/projects';
	import Project from './Project.svelte';
	import { scale, fade } from 'svelte/transition';

	export let projects: ProjectType[];
	export let user_id_hardcode: number;
</script>

<div class="projects py-2xl gap-x-xl gap-y-2xl">
	{#each projects as project, index (project)}
		<div
			in:scale|global={{
				duration: 200,
				delay: 40 * index
			}}
			out:fade|global={{
				duration: 200
			}}
		>
			<Project href="/{project.id}?user_id_hardcode={user_id_hardcode}" title={project.name} />
		</div>
	{/each}
</div>

<style lang="scss">
	.projects {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(224px, 1fr));
		align-items: start;
	}
</style>
