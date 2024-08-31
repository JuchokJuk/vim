<script lang="ts">
	import Header from '$lib/pages/home/Header.svelte';
	import ProjectsGrid from '$lib/pages/home/ProjectsGrid/ProjectsGrid.svelte';
	import { getProjects, type Project } from '$lib/shared/API/projects/projects';
	import DelayedMount from '$lib/shared/UI/DelayedMount.svelte';
	import { onMount } from 'svelte';

	let projects: Promise<Project[]>;

	onMount(async () => {
		projects = getProjects();
	});
</script>

<svelte:head>
	<title>Проекты</title>
</svelte:head>

<div class="content mx-auto px-xl h-full">
	<DelayedMount delay={400}>
		<Header />

		{#await projects}
			<p class="paragraph-xl">Загрузка проектов...</p>
		{:then projects}
			<ProjectsGrid {projects} />
		{:catch error}
			<p class="paragraph-xl">Ошибка загрузки проектов: <code>{error.message}</code></p>
		{/await}
	</DelayedMount>
</div>

<style lang="scss">
	.content {
		max-width: 1016px;
	}
</style>
