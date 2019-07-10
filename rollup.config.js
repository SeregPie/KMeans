import {terser} from 'rollup-plugin-terser';
import buble from 'rollup-plugin-buble';

import {main} from './package.json';

export default {
	input: 'src/index.js',
	plugins: [
		buble({objectAssign: 'Object.assign'}),
		terser(),
	],
	output: {
		file: main,
		format: 'umd',
		name: 'KMeans',
	},
};
