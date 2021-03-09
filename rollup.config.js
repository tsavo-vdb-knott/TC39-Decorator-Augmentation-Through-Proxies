
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { BabelLegacyConfig } from "./src/babel/legacy/config"
import { BabelTC39Config } from "./src/babel/tc39-v2/config"
import { babel } from '@rollup/plugin-babel';

const isBabel = Boolean(parseInt(process.env.BABEL, 10));
const isTypescript = !isBabel;
const isLegacy = process.env.DECORATORS === 'LEGACY' || isTypescript;

export default {
	// Pardon this chaos - T
	input: ('./src' + (isBabel ? ('/babel' + (isLegacy ? '/legacy' : '/tc39-v2')) : '/typescript') + ('/examples' + (isBabel ? '.js' : '.ts'))),
	output: {
		file: 'public/index.js',
		sourcemap: true,
		format: 'esm',
	},
	plugins: [
		resolve(),
		...(isBabel ? [babel(isLegacy ? BabelLegacyConfig : BabelTC39Config)] : []),
		...(isTypescript ? [typescript({ tsconfig: './src/typescript/tsconfig.json' })] : []),
		commonjs({...(isTypescript && { extensions: ['.js', '.ts'] })}),
	]
};