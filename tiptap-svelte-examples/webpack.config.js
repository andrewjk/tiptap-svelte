const SvgStore = require('webpack-svgstore-plugin')

const webpack = require('webpack')
const path = require('path')
const config = require('sapper/config/webpack.js')
const preprocess = require('svelte-preprocess')
const pkg = require('./package.json')

const mode = process.env.NODE_ENV
const dev = mode === 'development'

const alias = {
	svelte: path.resolve('node_modules', 'svelte'),
	'prosemirror-model': path.resolve('node_modules', 'prosemirror-model'),
	'prosemirror-state': path.resolve('node_modules', 'prosemirror-state'),
	'prosemirror-tables': path.resolve('node_modules', 'prosemirror-tables')
}
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html']
const mainFields = ['svelte', 'module', 'browser', 'main']

module.exports = {
	client: {
		entry: config.client.entry(),
		output: config.client.output(),
		resolve: { alias, extensions, mainFields },
		module: {
			rules: [
				{
					test: /\.(svelte|html)$/,
					use: {
						loader: 'svelte-loader',
						options: {
							dev,
							hydratable: true,
							hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
							preprocess: preprocess({
								/* options */
							}),
						},
					},
				},
				{
					test: /\.(css|scss)$/,
					use: [
						'style-loader',
						'css-loader',
						'sass-loader',
					],
				},
			],
		},
		mode,
		plugins: [
			// pending https://github.com/sveltejs/svelte/issues/2377
			// dev && new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			// svg icons
			new SvgStore({
				prefix: 'icon--',
				svgoOptions: {
					plugins: [
						{ cleanupIDs: false },
						{ collapseGroups: false },
						{ removeTitle: true },
					],
				},
			}),
		].filter(Boolean),
		devtool: dev && 'inline-source-map',
	},

	server: {
		entry: config.server.entry(),
		output: config.server.output(),
		target: 'node',
		resolve: { alias, extensions, mainFields },
		externals: Object.keys(pkg.dependencies).concat('encoding'),
		module: {
			rules: [
				{
					test: /\.(svelte|html)$/,
					use: {
						loader: 'svelte-loader',
						options: {
							css: false,
							generate: 'ssr',
							dev,
							preprocess: preprocess({
								/* options */
							}),
						},
					},
				},
			],
		},
		mode: process.env.NODE_ENV,
		performance: {
			hints: false, // it doesn't matter if server.js is large
		},
	},

	serviceworker: {
		entry: config.serviceworker.entry(),
		output: config.serviceworker.output(),
		mode: process.env.NODE_ENV,
	},
}
