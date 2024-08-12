<script lang="ts">
	export let src: string;
	export let scale: number;
	export let itemSize: number;
</script>

<div class="object" style="--item-size: {itemSize}px;">
	<img {src} alt={src} style="transform: scale({scale});" />
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
			width: 100%;
			height: 100%;

			filter: contrast(1.05) saturate(1.1) brightness(1.4);
		}
	}
</style>
