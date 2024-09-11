<script lang="ts">
	import { getProjectLayouts, type Layout } from '$lib/shared/SDK/API/queries/projects/layouts.js';

	import { onMount } from 'svelte';

	let layouts: Promise<Layout[]> | [] = [];

	export let data;

	onMount(() => {
		// USE ONLY FOR METADATA, NEEDS TRANSFORM TO LOCAL DATA STRUCTURE
		layouts = getProjectLayouts({ projectId: Number(data.projectId) });
	});
</script>

<svelte:head>
	<title>Варианты – VIM</title>
</svelte:head>

{#await layouts}
	<p class="paragraph-xl">Загрузка вариантов...</p>
{:then layouts}
	{#each layouts as layout}
		<a class="block" href="/{data.projectId}/{layout.id}">{layout.name}</a>
	{/each}
{:catch error}
	<p class="paragraph-xl">Ошибка загрузки вариантов: <code>{error.message}</code></p>
{/await}
