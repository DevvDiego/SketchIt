import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: "404.html",
			precompress: false,
			strict: true
		}),
		paths:{
			base: "/SketchIt"
		}
	},
	preprocess: vitePreprocess()
};

export default config;
