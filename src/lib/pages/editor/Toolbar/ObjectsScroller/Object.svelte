<script lang="ts">
	import type { Catalog } from '$lib/shared/editorEngine/API/queries/furniture';
	import { activeFurnitureItem } from '$lib/shared/store/3d/activeFurnitureItem';

	export let scale: number;
	export let itemSize: number;
	export let object: Catalog;

	function createImageSrc(src: string | undefined) {
		if (!src) return '';
		if (src.startsWith('/')) {
			return `http://demo.platformvim.org${src}`;
		}
		return src;
	}

	function setActveFurnitureItem() {
		$activeFurnitureItem = object;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="object rounded-md" style="--item-size: {itemSize}px;" on:click={setActveFurnitureItem}>
	<img
		draggable="false"
		class="h-full w-full"
		src={createImageSrc(object.collage_image_src)}
		alt={object.name}
		style="transform: scale({scale});"
	/>
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
			width: 32px;
			height: 32px;
			object-fit: contain;
		}
	}
</style>
