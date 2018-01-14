import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

export default {
	input: 'src/almete.KMeans.js',
	output: {
		file: 'almete.KMeans.js',
		format: 'umd',
		name: 'almete.KMeans',
	},
	plugins: [
		buble(),
		uglify(),
	],
};
