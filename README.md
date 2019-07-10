# KMeans

```
KMeans(vectors, centroids, {
  distanceBetween,
  map,
  maxIterations = 1024,
  mean,
})
```

Implementation of the basic [k-means algorithm](https://en.wikipedia.org/wiki/K-means_clustering) to partition vectors into clusters.

| argument | description |
| ---: | :--- |
| `vectors` | An array of vectors to be clustered. |
| `centroids` | Initial centroids for each cluster. The value can be an array of vectors or a number to take from the given values. |
| `maxIterations` | The maximum number of iterations before the algorithm terminates. |

Returns clusters as an array of arrays.

## setup

### npm

```shell
npm install @seregpie/kmeans
```

### es6

```javascript
import KMeans from '@seregpie/kmeans';
```

### node

```javascript
let KMeans = require('@seregpie/kmeans');
```

### browser

```html
<script src="https://unpkg.com/@seregpie/kmeans"></script>
```

The module is globally available as `KMeans`.

## usage

```javascript
let vectorSize = 3, vectorsCount = 1000, clustersCount = 12;
let vectors = Array.from({length: vectorsCount}, () => Array.from(({length: vectorSize}), () => Math.random()));
let clusters = KMeans(vectors, clustersCount);
console.log(clusters.length === clustersCount); // => true
console.log(clusters.flat().length === vectorsCount); // => true
```

---

Initialize centroids where to start the algorithm.

```javascript
let vectors = [
  [6, 7, 9], [0, 1, 6], [5, 2, 4], [7, 7, 0], [0, 4, 8],
  [0, 9, 2], [2, 3, 5], [0, 3, 6], [7, 6, 4], [8, 3, 4],
  [7, 8, 7], [6, 5, 5], [8, 5, 8], [3, 8, 2], [0, 4, 9],
];
let centroids = [[7, 0, 0], [0, 7, 0], [0, 0, 7]];
let clusters = KMeans(vectors, centroids);
console.log(clusters[0]);
// => [[6, 7, 9], [5, 2, 4], [7, 7, 0], [7, 6, 4], [8, 3, 4], [7, 8, 7], [6, 5, 5], [8, 5, 8]]
console.log(clusters[1]);
// => [[0, 9, 2], [3, 8, 2]]
console.log(clusters[2]);
// => [[0, 1, 6], [0, 4, 8], [2, 3, 5], [0, 3, 6], [0, 4, 9]]
```

---

You can use any values instead of vectors. In this case you must provide a function to convert a value to a vector.

```javascript
let Athlete = class {
  constructor(name, height, weight) {
    this.name = name;
    this.height = height;
    this.weight = weight;
  }
  toJSON() {
    return this.name;
  }
};

let athletes = [
  new Athlete('A', 185, 72), new Athlete('B', 170, 56), new Athlete('C', 168, 60),
  new Athlete('D', 179, 68), new Athlete('E', 182, 72), new Athlete('F', 188, 77),
  new Athlete('G', 180, 71), new Athlete('H', 180, 70), new Athlete('I', 183, 84),
  new Athlete('J', 180, 88), new Athlete('K', 180, 67), new Athlete('L', 177, 76),
];
let clusters = KMeans(athletes, [athletes[0], athletes[1]], {
  map: athlete => [athlete.height, athlete.weight],
});
// => [['A', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'], ['B', 'C']]
```
