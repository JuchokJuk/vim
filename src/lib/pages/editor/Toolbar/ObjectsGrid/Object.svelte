<script lang="ts">
	export let src: string;
</script>

<div class="object flex flex-col items-center gap-md">
	<div class="image flex items-center justify-center rounded-md">
		<img {src} alt={src} />
	</div>

	<p class="paragraph-md elipsis-1">{src}</p>
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
				width: 50%;
				display: block;

				filter: contrast(1.05) saturate(1.1) brightness(1.4);

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
