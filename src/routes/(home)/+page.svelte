<script lang="ts">
	import ProjectsGrid from '$lib/pages/home/ProjectsGrid/ProjectsGrid.svelte';
	import {
		getProjects,
		type Project
	} from '$lib/shared/editorEngine/API/queries/projects/projects';
	import { userId } from '$lib/shared/store/user';
	import { onMount } from 'svelte';

	let projects: Promise<Project[]> | [] = [];

	onMount(async () => {
		projects = getProjects({ user_id_hardcode: $userId });
	});
</script>

<svelte:head>
	<title>Проекты – VIM</title>
</svelte:head>

{#await projects}
	<p class="paragraph-xl">Загрузка проектов...</p>
{:then projects}
	<ProjectsGrid {projects} />
{:catch error}
	<p class="paragraph-xl">Ошибка загрузки проектов: <code>{error.message}</code></p>
{/await}
