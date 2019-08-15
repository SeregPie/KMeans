import JustMyLuck from 'just-my-luck';

import Array_indexOfMin from './utils/Array/indexOfMin';
import Array_make from './utils/Array/make';
import Function_stubArray from './utils/Function/stubArray';

import defaultOptions from './defaultOptions';

export default Object.assign(function(rawValues, rawMeans, {
	distance: calculateDistance = defaultOptions.distance,
	map = defaultOptions.map,
	maxIterations = defaultOptions.maxIterations,
	mean: calculateMean = defaultOptions.mean,
	random = defaultOptions.random,
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
}, defaultOptions);
