import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@use "sass:map";
					@import "$lib/styles/variables/roundings.scss";
					@import "$lib/styles/variables/spacings.scss";
					@import "$lib/styles/mixins/spacing.scss";
					@import "$lib/styles/mixins/elipsis.scss";
					@import "$lib/styles/mixins/hover.scss";
					@import "$lib/styles/mixins/card.scss";
				`
			}
		}
	}
});
