<script lang="ts">
	export let href: string;
	export let title: string;
	import logo from './logo.svg?raw';
</script>

<a {href} class="project flex flex-col gap-lg">
	<div class="image flex items-center justify-center rounded-md">
		{@html logo}
	</div>

	<p class="px-xs paragraph-md elipsis-1">{title}</p>
</a>

<style lang="scss">
	.project {
		cursor: pointer;
		text-decoration: none;

		@include hover {
			:global(svg) {
				transform: scale(1.1);
			}

			p {
				color: var(--text-1);
			}
		}

		.image {
			width: 100%;
			aspect-ratio: 1.618;

			background: var(--surface-1);

			border: 1px solid var(--light-1);

			:global(svg) {
				width: 50%;
				display: block;
				color: var(--surface-2);

				transition: transform 0.2s;
			}
		}

		p {
			width: 100%;
			word-wrap: break-word;
			color: var(--text-0);

			transition: color 0.2s;
		}
	}
</style>
