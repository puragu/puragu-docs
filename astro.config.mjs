// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Puragu',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: "開発方法", link:"/"
				},
				{
					label: '勉強会',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'ts-puzzle', slug: 'study/ts-puzzle' },
					],
				},
			],
		}),
	],
});
