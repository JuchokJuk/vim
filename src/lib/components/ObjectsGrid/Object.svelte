<script lang="ts">
	export let src: string;
</script>

<div class="object">
	<img {src} alt={src} />

	<p class="elipsis-1">{src.split('.')[0]}</p>
</div>

<style lang="scss">
	.object {
		width: 96px;

		display: grid;
		grid-template-rows: 96px auto;

		@include spacing(gap, s);

		cursor: pointer;

		&:hover {
			img {
				transform: scale(1.2);
			}

			p {
				color: var(--text-1);
			}
		}

		img {
			width: 96px;
			display: block;

			filter: contrast(1.05) saturate(1.1) brightness(1.4);

			transition: transform 0.2s;
		}

		p {
			width: 96px;
			text-align: center;
			word-break: break-word;

			transition: color 0.2s;

			color: var(--text-0);
		}
	}
</style>
