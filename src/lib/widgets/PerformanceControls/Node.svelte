<script lang="ts">
	import {
		performanceSettings,
		type Parameter
	} from '$lib/shared/store/performanceSettings/performanceSettings';
	import ToggleGroup from '$lib/shared/UI/ToggleGroup.svelte';
	import Switch from '$lib/shared/UI/Switch.svelte';
	import { get } from 'svelte/store';

	export let settings: Record<string, Parameter<any>>;
	export let path: string[];

	// Function to update the store recursively
	function toggleSetting(path: string[], value: any) {
		let temp: any = performanceSettings;

		path.forEach((key, index) => {
			if (index === path.length - 1) {
				temp[key].value.value.set(value);
			} else {
				temp = temp[key];
			}
		});
	}

	function setOptionSetting(path: string[], value: any) {
		let temp: any = performanceSettings;

		path.forEach((key, index) => {
			if (index === path.length - 1) {
				temp[key].value.activeOption.set(value);
			} else {
				temp = temp[key];
			}
		});
	}
</script>

{#each Object.keys(settings) as feature}
	{@const node = settings[feature]}
	{@const label = settings[feature].title}
	{@const currentNodePath = [...path, feature]}

	<li class="node ml-xl py-md flex flex-col gap-md">
		{#if node.value.type === 'boolean'}
			<div class="flex gap-md justify-between w-full">
				{label}
				<Switch
					value={get(node.value.value)}
					onChange={(value) => toggleSetting(currentNodePath, value)}
				/>
			</div>
		{:else if node.value.type === 'selection'}
			<div class="flex flex-col gap-md">
				{label}
				<ToggleGroup
					items={node.value.options.map((option, index) => ({
						value: String(option),
						label: String(option),
						handler: () => setOptionSetting(currentNodePath, index)
					}))}
				/>
			</div>
		{/if}

		{#if node.settings}
			<ul class="features">
				<svelte:self settings={node.settings} path={[...currentNodePath, 'settings']} />
			</ul>
		{/if}
	</li>
{/each}

<style lang="scss">
	.node {
		label {
			display: flex;
			align-items: center;
			@include spacing(gap, md);
		}

		ul {
			list-style: none;
		}
	}
</style>
