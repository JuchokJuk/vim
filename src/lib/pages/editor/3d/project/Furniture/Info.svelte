<script lang="ts">
	import HTML from '$lib/shared/3d/HTML/HTML.svelte';
	import { fly } from 'svelte/transition';
	import { outside } from '$lib/shared/utils/outside';

	export let content: string;

	let visible = false;

	function open(event: Event) {
		event.stopPropagation();
		visible = true;
	}

	function close() {
		visible = false;
	}
</script>

<slot {open} />

{#if visible}
	<HTML center>
		<div
			class="info card p-xl rounded-lg"
			transition:fly|global={{ duration: 200, y: 16 }}
			use:outside={{ event: 'pointerdown', cb: close }}
		>
			<p class="paragraph-md">{content}</p>
		</div>
	</HTML>
{/if}

<style lang="scss">
	.info {
		width: max-content;
		max-width: 240px;
	}
</style>
