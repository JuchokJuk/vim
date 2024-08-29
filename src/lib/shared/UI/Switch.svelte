<script lang="ts">
	export let value: boolean;
	export let onChange: ((value: boolean) => void) | undefined = undefined;

	function toggle() {
		value = !value;
		if (onChange) onChange(value);
	}
</script>

<div class="switch rounded-full" class:checked={value} on:pointerdown={toggle}>
	<div class="thumb rounded-full" />
</div>

<style lang="scss">
	.switch {
		$size: 18px;
		$padding: map.get($spacings, '3xs');
		flex-shrink: 0;

		height: $size;
		padding: $padding;
		background: var(--surface-3);
		transition: background-color 0.2s;

		width: $size * 2;

		&.checked {
			background: var(--primary-0);
			.thumb {
				transform: translate($size);
			}
		}

		.thumb {
			width: $size - 2 * $padding;
			height: $size - 2 * $padding;
			transition: transform 0.2s;
			background: var(--white-const);

			box-shadow: 0 1px 4px 0 var(--shadow-0);
		}
	}
</style>
