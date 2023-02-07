/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				outfit: ['Outfit', 'sans-serif']
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
