<script lang="ts">
	export let src: string;
	export let scale: number;
	export let itemSize: number;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="object rounded-md" style="--item-size: {itemSize}px;" on:click>
	<img draggable="false" class="h-full w-full" {src} alt={src} style="transform: scale({scale});" />
</div>

<style lang="scss">
	.object {
		flex-shrink: 0;
		width: var(--item-size);
		height: var(--item-size);
		cursor: pointer;

		display: flex;
		align-items: center;
		justify-content: center;

		img {
			filter: contrast(1.05) saturate(1.1) brightness(1.4);
		}
	}
</style>
