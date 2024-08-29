<script>
	import { Plus } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
</script>

<header
	class="flex justify-between items-center gap-xl py-xl paragraph-xl"
	transition:fade|global={{ duration: 200 }}
>
	<div class="user flex gap-lg items-center">
		<div class="avatar grid place-content-center rounded-md">И</div>
		<span>Иван Иванов</span>
	</div>
	<button class="button flex items-center pl-xl pr-lg py-lg gap-md rounded-md paragraph-md">
		Новый проект
		<Plus class="icon" />
	</button>
</header>

<style lang="scss">
	.user {
		flex-shrink: 0;
		color: var(--text-2);
		.avatar {
			width: 42px;
			height: 42px;
			background: var(--primary-0);
			color: var(--white-const);
		}
	}

	.button {
		flex-shrink: 0;
		border: none;
		height: 42px;
		background: var(--primary-0);
		color: var(--white-const);

		:global(.icon) {
			width: 20px;
			height: 20px;
		}
	}
</style>
