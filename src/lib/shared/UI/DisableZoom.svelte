<script lang="ts">
	function preventZoom(event: WheelEvent) {
		if (event.ctrlKey) {
			event.preventDefault();
		}
	}
</script>

<svelte:window on:wheel|nonpassive={preventZoom} />
