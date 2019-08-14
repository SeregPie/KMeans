import JustMyLuck from 'just-my-luck';

import Array_indexOfMin from './utils/Array/indexOfMin';
import Array_make from './utils/Array/make';
import Array_mean from './utils/Array/mean';
import Function_identity from './utils/Function/identity';
import Function_stubArray from './utils/Function/stubArray';

let KMeans = function(rawValues, rawMeans, {
	distance: calculateDistance = KMeans.distance,
	map = KMeans.map,
	maxIterations = KMeans.maxIterations,
	mean: calculateMean = KMeans.mean,
	random = KMeans.random,
} = {}) {
	let b = Number.isFinite(rawMeans);
	let clustersCount;
	if (b) {
		clustersCount = rawMeans;
	} else {
		rawMeans = Array.from(rawMeans);
		clustersCount = rawMeans.length;
	}
	if (!clustersCount) {
		return [];
	}
	rawValues = Array.from(rawValues);
	if (clustersCount === 1) {
		return [rawValues];
	}
	let myLuck = new JustMyLuck(random);
	let values = rawValues.map(map);
	let means;
	if (b) {
		means = myLuck.items(values, clustersCount);
	} else {
		means = rawMeans.map(map);
	}
	let assignments = [];
	for (let i = 0; i < maxIterations; i++) {
		let converged = true;
		values.forEach((value, valueIndex) => {
			let clusterIndex = Array_indexOfMin(means, mean => calculateDistance(value, mean));
			if (clusterIndex !== assignments[valueIndex]) {
				assignments[valueIndex] = clusterIndex;
				converged = false;
			}
		});
		if (converged) {
			break;
		}
		let clusters = Array_make(clustersCount, Function_stubArray);
		assignments.forEach((clusterIndex, valueIndex) => {
			clusters[clusterIndex].push(values[valueIndex]);
		});
		means = means.map((mean, clusterIndex) => {
			let cluster = clusters[clusterIndex];
			if (cluster.length) {
				mean = calculateMean(cluster);
			} else {
				// handle empty cluster
			}
			return mean;
		});
	}
	let rawClusters = Array_make(clustersCount, Function_stubArray);
	assignments.forEach((clusterIndex, valueIndex) => {
		rawClusters[clusterIndex].push(rawValues[valueIndex]);
	});
	return rawClusters;
};

Object.assign(KMeans, {
	distance(value, otherValue) {
		return Math.hypot(...value.map((n, i) => n - otherValue[i]));
	},

	map: Function_identity,

	maxIterations: 1024,

	mean(values) {
		return values[0].map((n, i) => Array_mean(values.map(value => value[i])));
	},

	random: Math.random,
});

export default KMeans;
