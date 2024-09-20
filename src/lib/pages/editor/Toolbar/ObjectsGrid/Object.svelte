<script lang="ts">
	import type { Catalog } from '$lib/shared/editorEngine/API/queries/furniture';
	import { activeFurnitureItem } from '$lib/shared/store/3d/activeFurnitureItem';

	export let object: Catalog;
	export let close: () => void;

	function createImageSrc(src: string | undefined) {
		if (!src) return '';
		if (src.startsWith('/')) {
			return `http://demo.platformvim.org${src}`;
		}
		return src;
	}

	function setActveFurnitureItem() {
		$activeFurnitureItem = object;
		close();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="object flex flex-col items-center gap-md" on:click={setActveFurnitureItem}>
	<div class="image flex items-center justify-center rounded-md overflow-hidden">
		<img src={createImageSrc(object.collage_image_src)} alt={object.name} />
	</div>

	<p class="paragraph-md elipsis-1">{object.name}</p>
</div>

<style lang="scss">
	.object {
		cursor: pointer;

		@include hover {
			img {
				transform: scale(1.2);
			}

			p {
				color: var(--text-1);
			}
		}

		.image {
			width: 100%;
			aspect-ratio: 1;

			background: var(--surface-2);

			img {
				width: 75%;
				display: block;

				transition: transform 0.2s;
			}
		}

		p {
			width: 100%;
			word-wrap: break-word;
			text-align: center;

			transition: color 0.2s;
		}
	}
</style>
