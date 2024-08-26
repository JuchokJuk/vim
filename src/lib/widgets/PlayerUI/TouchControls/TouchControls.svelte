<script lang="ts">
	import { scale } from 'svelte/transition';
	import Joystick from './Joystick.svelte';
	import JumpButton from './JumpButton.svelte';
</script>

<div transition:scale|global={{ duration: 400, delay: 100 }} class="joystick">
	<Joystick />
</div>

<div transition:scale|global={{ duration: 400, delay: 100 * 2 }} class="jump">
	<JumpButton />
</div>

<style lang="scss">
	.joystick {
		position: absolute;
		bottom: 48px;
		left: 48px;
	}

	.jump {
		position: absolute;
		bottom: 48px + 64px - 32px;
		right: 48px + 64px - 32px;
	}
</style>
