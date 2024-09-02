<script lang="ts">
	import Header from '$lib/pages/home/Header.svelte';
	import DelayedMount from '$lib/shared/UI/DelayedMount.svelte';
</script>

<div class="content mx-auto px-xl h-full">
	<DelayedMount delay={400}>
		<Header />

		<slot />
	</DelayedMount>
</div>

<style lang="scss">
	.content {
		max-width: 1016px;
	}
</style>
