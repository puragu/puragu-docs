// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Puragu',
			locales: {
				root: {
					label: "日本語",
					lang: "ja"
				}
			},
			sidebar: [
				{
					label: "開発方法", link: "/"
				},
				{
					label: '勉強会',
					autogenerate: { directory: "study" }
				},
			],
		}),
	],
});
