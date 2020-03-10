import {terser} from 'rollup-plugin-terser';
import buble from '@rollup/plugin-buble';

import {main} from './package.json';

let globals = {
	'just-my-luck': 'JustMyLuck',
	'@seregpie/vector-math': 'VectorMath',
};

export default {
	external: Object.keys(globals),
	input: 'src/index.js',
	plugins: [
		buble(),
		terser(),
	],
	output: {
		file: main,
		format: 'umd',
		name: 'KMeans',
		globals,
	},
};
