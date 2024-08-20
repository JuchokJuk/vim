<script lang="ts">
	import { performanceSettings } from '$lib/store/performanceSettings';
	import Node from './Node.svelte';
</script>

<div class="container card py-xl pr-xl corners-lg">
	{#each Object.keys($performanceSettings) as feature}
		<Node node={$performanceSettings[feature]} path={[feature]} label={$performanceSettings[feature].title} />
	{/each}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		@include spacing(gap, lg);
		padding-left: -1 * map.get($spacing, 'xl');
	}
</style>
