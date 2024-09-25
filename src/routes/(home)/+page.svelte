<script lang="ts">
	import ProjectsGrid from '$lib/pages/home/ProjectsGrid/ProjectsGrid.svelte';
	import {
		getProjects,
		type Project
	} from '$lib/shared/editorEngine/API/queries/projects/projects';
	import { onMount } from 'svelte';

	let projects: Promise<Project[]> | [] = [];

	export let data;

	onMount(async () => {
		projects = getProjects({ user_id_hardcode: data.user_id_hardcode });
	});
</script>

<svelte:head>
	<title>Проекты – VIM</title>
</svelte:head>

{#await projects}
	<p class="paragraph-xl">Загрузка проектов...</p>
{:then projects}
	<ProjectsGrid {projects} user_id_hardcode={data.user_id_hardcode} />
{:catch error}
	<p class="paragraph-xl">Ошибка загрузки проектов: <code>{error.message}</code></p>
{/await}
