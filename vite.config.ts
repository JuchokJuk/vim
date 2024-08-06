import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@import "$lib/styles/variables/spacings.scss";
					@import "$lib/styles/mixins/spacing.scss";
					@import "$lib/styles/mixins/elipsis.scss";
				`
			}
		}
	}
});
