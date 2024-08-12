<script lang="ts">
	export let label: string;
	export let path: string[];
	export let node;
	import { performanceSettings } from '$lib/store/performanceSettings';

	// Function to update the store recursively
	function toggleSetting(path: string[]) {
		performanceSettings.update((currentSettings) => {
			let temp = currentSettings;
			path.forEach((key, index) => {
				if (index === path.length - 1) {
					temp[key].enabled = !temp[key].enabled;
				} else {
					temp = temp[key];
				}
			});
			return currentSettings;
		});
	}

	function handleChange() {
		toggleSetting(path);
	}
</script>

<div class="node ml-xl">
	<label>
		<input type="checkbox" checked={node.enabled} on:change={handleChange} />
		{label}
	</label>

	{#if node.settings}
		<div class="features">
			{#each Object.keys(node.settings) as key}
				<svelte:self label={key} path={[...path, 'settings', key]} node={node.settings[key]} />
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.node {
		label {
			display: flex;
			align-items: center;
			@include spacing(gap, md);
		}
	}
</style>
