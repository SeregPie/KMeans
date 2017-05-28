(function(factory) {
	if (typeof module !== 'undefined' && typeof exports !== 'undefined' && this === exports) {
		module.exports = factory({});
	} else {
		this.almete = this.almete || {};
		factory(this.almete);
	}
}).call(this, function(almete) {

	let _forEach = function(array, iteratee, i = 0, ii) {
		let l = array.length;
		ii = (ii === undefined) ? l : Math.min(ii, l);
		while (i < ii) {
			if (iteratee(array[i], i) === false) {
				break;
			}
			++i;
		}
	};

	let _fillBy = function(array, iteratee, i = 0, ii) {
		let l = array.length;
		ii = (ii === undefined) ? l : Math.min(ii, l);
		while (--ii >= i) {
			array[ii] = iteratee(ii);
		}
		return array;
	};

	let _map = function(array, iteratee) {
		let returns = new Array(array.length);
		_forEach(array, (value, index) => {
			returns[index] = iteratee(value, index);
		});
		return returns;
	};

	let _minBy = function(array, iteratee) {
		let returns;
		let minN = Infinity;
		_forEach(array, (value, index) => {
			let newN = iteratee(value, index);
			if (newN < minN) {
				minN = newN;
				returns = value;
			}
		});
		return returns;
	};

	let _zip = function(array, otherArray) {
		return _map(array, (value, index) => [value, otherArray[index]]);
	};

	let _every = function(array, iteratee) {
		let returns = true;
		_forEach(array, (value, index) => {
			if (!iteratee(value, index)) {
				return(returns = false);
			}
		});
		return returns;
	};

	let _stubArray = function() {
		return [];
	};



	let defaultOptions = {
		maxIterations: 1024,

		map: function(vector) {
			return vector;
		},

		isEqual: function(vector, otherVector) {
			return _every(vector, (v, i) => v === otherVector[i]);
		},

		distanceBetween: function(vector, otherVector) {
			let squaredDistance = 0;
			_forEach(vector, (v, i) => {
				squaredDistance += Math.pow(v - otherVector[i], 2);
			});
			return Math.sqrt(squaredDistance);
		},

		meanOf: function(vectors) {
			let l = vectors.length;
			return _map(vectors[0], (s, i) => {
				_forEach(vectors, vector => {
					s += vector[i];
				}, 1);
				return s / l;
			});
		},
	};



	return(almete.KMeans = Object.assign(function(values, clusters, options) {
		let {
			maxIterations,
			map,
			isEqual,
			distanceBetween,
			meanOf,
		} = Object.assign({}, defaultOptions, options);
		if (maxIterations < 1) {
			return [];
		}
		let valuesCount = values.length;
		if (valuesCount < 1) {
			return [];
		}
		let clustersCount;
		let originalValues = values;
		if (Array.isArray(clusters)) {
			clustersCount = clusters.length;
			if (clustersCount < 1) {
				return [];
			}
			if (clustersCount === 1) {
				return [originalValues.slice()];
			}
			values = _map(values, value => map(value));
			clusters = _map(clusters, cluster => map(cluster));
		} else {
			clustersCount = clusters;
			if (clustersCount < 1) {
				return [];
			}
			if (clustersCount === 1) {
				return [originalValues.slice()];
			}
			if (clustersCount >= valuesCount) {
				let returns = new Array(clustersCount);
				_fillBy(returns, i => [originalValues[i]], 0, valuesCount);
				_fillBy(returns, _stubArray, valuesCount);
				return returns;
			}
			values = _map(values, value => map(value));
			clusters = values.slice(0, clustersCount);
		}
		let zippedValues = _zip(originalValues, values);

		let clusteredValues;
		let loop;
		do {
			clusteredValues = _map(clusters, value => [[], [], value]);
			_forEach(zippedValues, ([originalValue, value]) => {
				let [originalValues, values] = _minBy(clusteredValues, ([a, b, clusterValue]) => distanceBetween(value, clusterValue));
				originalValues.push(originalValue);
				values.push(value);
			});
			if (--maxIterations < 1) {
				break;
			}
			loop = false;
			clusters = _map(clusteredValues, ([a, values, oldClusterValue]) => {
				if (values.length < 1) {
					return oldClusterValue;
				}
				let newClusterValue = meanOf(values);
				if (!isEqual(oldClusterValue, newClusterValue)) {
					loop = true;
				}
				return newClusterValue;
			});
		} while (loop);
		return _map(clusteredValues, ([originalValues]) => originalValues);
	}, defaultOptions));

});