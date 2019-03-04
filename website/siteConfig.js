// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

module.exports = {
	title: 'simpleS', // Title for your website.
	tagline: 'A Simple Web Framework for Node.js',
	url: 'https://simples.js.org', // Your website URL
	baseUrl: '/', // Base URL for your project */
	// For github.io type URLs, you would set the url and baseUrl like:
	//   url: 'https://facebook.github.io',
	//   baseUrl: '/test-site/',

	// Used for publishing and more
	projectName: 'simpleS',
	// For top-level user or org sites, the organization is still the same.
	// e.g., for the https://JoelMarcey.github.io site, it would be set like...
	organizationName: 'micnic',

	// For no header links in the top nav bar -> headerLinks: [],
	headerLinks: [{
		doc: 'index',
		label: 'Docs'
	}, {
		href: 'https://npmjs.org/package/simples',
		label: 'npm'
	}, {
		href: 'https://github.com/micnic/simpleS',
		label: 'GitHub'
	}],

	/* path to images for header/footer */
	headerIcon: 'img/logo-white.svg',
	footerIcon: 'img/logo-square.svg',
	favicon: 'img/favicon.png',

	/* Colors for website */
	colors: {
		primaryColor: '#4F4FBF',
		secondaryColor: '#2F2F9F',
	},

	/* Custom fonts for website */
	/*
	fonts: {
		myFont: [
			"Times New Roman",
			"Serif"
		],
		myOtherFont: [
			"-apple-system",
			"system-ui"
		]
	},
	*/

	// This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
	copyright: `Copyright © 2012 - ${new Date().getFullYear()} Nicu Micleușanu`,

	highlight: {
		// Highlight.js theme to use for syntax highlighting in code blocks.
		theme: 'foundation',
	},

	// Add custom scripts here that would be placed in <script> tags.
	scripts: [
		'https://buttons.github.io/buttons.js'
	],

	// On page navigation for the current documentation page.
	onPageNav: 'separate',
	// No .html extensions for paths.
	cleanUrl: true,

	// Open Graph and Twitter card images.
	ogImage: 'img/logo.svg',
	twitterImage: 'img/logo.svg',

	// Show documentation's last contributor's name.
	// enableUpdateBy: true,

	// Show documentation's last update time.
	// enableUpdateTime: true,

	// You may provide arbitrary config keys to be used as needed by your
	// template. For example, if you need your repo's URL...
	repoUrl: 'https://github.com/micnic/simples',

	disableHeaderTitle: true
};