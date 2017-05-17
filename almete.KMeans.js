(function(factory) {
	if (typeof module !== 'undefined' && typeof exports !== 'undefined' && this === exports) {
		module.exports = factory({});
	} else {
		this.almete = this.almete || {};
		factory(this.almete);
	}
}).call(this, function(almete) {

	let _sampleSize = function(array, n) {
		array = array.slice();
		let arraySize = array.length;
		n = Math.min(n, arraySize);
		let randomValues = [];
		while (n--) {
			let randomIndex = Math.floor(Math.random()*arraySize);
			let randomValue = array.splice(randomIndex, 1)[0];
			arraySize--;
			randomValues.push(randomValue);
		}
		return randomValues;
	};

	let _sum = function(array) {
		return array.reduce((a, b) => a + b, 0);
	};

	let _mean = function(array) {
		return _sum(array) / array.length;
	};

	let _minBy = function(array, by) {
		let minValue;
		let minN = Infinity;
		for (let i = array.length; i--;) {
			let value = array[i];
			let n = by(value);
			if (n < minN) {
				minN = n;
				minValue = value;
			}
		}
		return minValue;
	};

	let _zip = function(array, ...otherArrays) {
		return array.map((value, i) => {
			return [value, ...otherArrays.map(array => array[i])];
		});
	};

	let _isEqual = function(value, otherValue) {
		if (value === otherValue) {
			return true;
		}
		if (Array.isArray(value) && Array.isArray(otherValue) && value.length === otherValue.length) {
			return _zip(value, otherValue).every(([value, otherValue]) => _isEqual(value, otherValue));
		}
		return false;
	};

	let _nthArg = function(n = 0) {
		return function(...args) {
			return args[n];
		};
	};



	let _computeCentroid = function(vectors) {
		if (vectors.length === 0) {
			return undefined;
		}
		return vectors[0].map((_, i) => _mean(vectors.map(v => v[i])));
	};

	let _computeDistance = function(vector, anotherVector) {
		let squaredDistance = 0;
		for (let i = Math.min(vector.length, anotherVector.length); i--;) {
			squaredDistance += Math.pow(vector[i] - anotherVector[i], 2);
		}
		return Math.sqrt(squaredDistance);
	};



	return(almete.KMeans = function(vectors, centroids, {
		maxIterations = 1024,
		toVector = _nthArg(),
	} = {}) {
		if (maxIterations <= 0) {
			return [];
		}
		let vectorsSize = vectors.length;
		if (vectorsSize <= 0) {
			return [];
		}
		let clustersSize;
		let values = vectors;
		if (Array.isArray(centroids)) {
			clustersSize = centroids.length;
			if (clustersSize <= 0) {
				return [];
			}
			if (clustersSize === 1) {
				return [values];
			}
			vectors = vectors.map(vector => toVector(vector));
			centroids = centroids.map(centroid => toVector(centroid));
		} else {
			clustersSize = centroids;
			if (clustersSize <= 0) {
				return [];
			}
			if (clustersSize === 1) {
				return [values];
			}
			if (clustersSize >= vectorsSize) {
				let clusters = values.map(value => [value]);
				let emptyClusters = Array.from({length: clustersSize - vectorsSize}, () => []);
				return clusters.concat(emptyClusters);
			}
			vectors = vectors.map(vector => toVector(vector));
			centroids = _sampleSize(vectors, clustersSize);
		}
		let zippedValuesAndVectors = _zip(values, vectors);

		let clusters;
		for (let needy = true; needy && maxIterations--;) {
			clusters = centroids.map(centroid => [[], [], centroid]);
			zippedValuesAndVectors.forEach(([value, vector]) => {
				let [values, vectors] = _minBy(clusters, ([a, b, centroid]) => {
					return _computeDistance(vector, centroid);
				});
				values.push(value);
				vectors.push(vector);
			});
			needy = false;
			centroids = clusters.map(([values, vectors, oldCentroid]) => {
				let newCentroid = _computeCentroid(vectors);
				if (!_isEqual(oldCentroid, newCentroid)) {
					needy = true;
				}
				return newCentroid;
			});
		}
		return clusters.map(([values]) => values);
	});

});