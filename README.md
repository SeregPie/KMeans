# almete.KMeans

`almete.KMeans(vectors, centroids, options)`

...

| argument | description |
| ---: | :--- |
| `vectors` | ... |
| `centroids` | ... |

Returns an array of clusters.

## dependencies

*no dependencies*

## usage

```javascript
let vectorSize = 3, vectorsCount = 1000, clustersCount = 12;
let vectors = Array.from({length: vectorsCount}, () => Array.from({length: vectorSize}, () => Math.random()));
let clusters = almete.KMeans(vectors, clustersCount);
console.log(clusters.length); // => 12
console.log([].concat(...clusters).length); // => 1000
```

---

...

```javascript
let vectors = [[1, 1, 1], ...];
let centroids = [[1, 1, 1], ...];
let clusters = almete.KMeans(vectors, centroids);
// => [[4, 6], [4, 3], [4, 5], [2, 5, 1]]
```

---

Instead of vectors you can use any values. However, you must provide a function to convert each value to a vector.

```javascript
let Athlete = class {
  constructor(name, height, weight) {
    this.name = name;
    this.height = height;
    this.weight = weight;
  }
  toString() {
    return this.name;
  }
};

let athletes = [
  new Athlete('A', 185, 72), new Athlete('B', 170, 56), new Athlete('C', 168, 60),
  new Athlete('D', 179, 68), new Athlete('E', 182, 72), new Athlete('F', 188, 77),
  new Athlete('G', 180, 71), new Athlete('H', 180, 70), new Athlete('I', 183, 84),
  new Athlete('J', 180, 88), new Athlete('K', 180, 67), new Athlete('L', 177, 76),
];
let clusters = almete.KMeans(athletes, [athletes[0], athletes[1]], {
  toVector: athlete => [athlete.height, athlete.weight],
});
// => [['A', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'], ['B', 'C']]
```

## see also

- [almete.NearestNeighborChain](https://github.com/SeregPie/almete.NearestNeighborChain)
