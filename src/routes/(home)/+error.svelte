<script lang="ts">
	import { page } from '$app/stores';
</script>

<p class="paragraph-xl">Ошибка загрузки проектов: <code>{$page.error?.message}</code></p>
