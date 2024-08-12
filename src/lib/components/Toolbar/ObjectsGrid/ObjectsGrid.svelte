<script lang="ts">
	import Object from './Object.svelte';
	import { scale, fade } from 'svelte/transition';

	const objects = [
		'bed.png',
		'bedKing.png',
		'bookCase.png',
		'booksCaseLarge.png',
		'chair.png',
		'closet1.png',
		'closet2.png',
		'cushionedChair.png',
		'handleChair.png',
		'lamp1.png',
		'lamp2.png',
		'plant.png',
		'sofa.png',
		'sofaDouble.png',
		'sofaLong.png',
		'stool.png',
		'table1.png',
		'table2.png',
		'table3.png',
		'vase1.png',
		'vase2.png'
	];
</script>

<div class="objects py-2xl">
	{#each objects as object, index (object)}
		<div
			in:scale|global={{
				duration: 200,
				delay: 40 * index
			}}
			out:fade|global={{
				duration: 200
			}}
		>
			<Object src={object} />
		</div>
	{/each}
</div>

<style lang="scss">
	.objects {
		display: grid;
		overflow: auto;
		user-select: none;
		grid-template-columns: repeat(4, 1fr);
		@include spacing(row-gap, '2xl');

		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>
