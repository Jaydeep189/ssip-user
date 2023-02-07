import { sveltekit } from '@sveltejs/kit/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true
			},
			manifest: {
				name: 'My App',
				short_name: 'My App',
				description: 'My App description',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				display: 'standalone'
			}
		})
	]
});
