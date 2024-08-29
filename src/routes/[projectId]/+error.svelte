<script lang="ts">
	import { page } from '$app/stores';
</script>

<p class="paragraph-xl">Ошибка загрузки проекта: <code>{$page.error?.message}</code></p>
