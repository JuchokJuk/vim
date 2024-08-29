<script lang="ts">
	import ProjectsGrid from '$lib/pages/home/ProjectsGrid/ProjectsGrid.svelte';

	export let data;
</script>

<ProjectsGrid projects={data.projects} />
