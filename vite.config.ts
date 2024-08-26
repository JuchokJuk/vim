import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@use "sass:map";
					@import "$lib/shared/styles/variables/roundings.scss";
					@import "$lib/shared/styles/variables/spacings.scss";
					@import "$lib/shared/styles/mixins/spacing.scss";
					@import "$lib/shared/styles/mixins/elipsis.scss";
					@import "$lib/shared/styles/mixins/hover.scss";
					@import "$lib/shared/styles/mixins/card.scss";
				`
			}
		}
	}
});
