
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import { babel } from '@rollup/plugin-babel';
import { BabelLegacyConfig } from "./src/babel/legacy/config"
import { BabelTC39Config } from "./src/babel/tc39-v2/config"

const isBabel = Boolean(parseInt(process.env.BABEL, 10));
const isTypescript = !babel;
const isLegacy = process.env.DECORATORS === 'LEGACY' || isTypescript;

export default {
	// Pardon this chaos - T
	input: './src' + (isBabel ? ('/babel' + (isLegacy ? '/legacy' : '/tc39-v2')) : '/typescript') + '/examples.js',
	output: {
		file: 'public/index.js',
		sourcemap: true,
		format: 'esm',
	},
	plugins: [
		resolve(),
		...(isBabel && [babel(isLegacy ? BabelLegacyConfig : BabelTC39Config)]),
		commonjs(),
	]
};