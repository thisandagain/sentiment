## sentiment
#### AFINN-based sentiment analysis for Node.js

[![Build Status](https://secure.travis-ci.org/thisandagain/sentiment.png)](http://travis-ci.org/thisandagain/sentiment)

Sentiment is a Node.js module that uses the [AFINN-111](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) wordlist to perform [sentiment analysis](http://en.wikipedia.org/wiki/Sentiment_analysis) on arbitrary blocks of input text. Sentiment provides serveral things:

- Performance (see benchmarks below)
- The ability to append and overwrite word / value pairs from the AFINN wordlist
- A build process that makes updating sentiment to future versions of the AFINN word list trivial

### Installation
```bash
npm install sentiment
```

### Usage
```javascript
var sentiment = require('sentiment');

var r1 = sentiment('Cats are stupid.');
console.dir(r1);        // Score: -2, Comparative: -0.666

var r2 = sentiment('Cats are totally amazing!');
console.dir(r2);        // Score: 4, Comparative: 1
```

### Adding / overwriting words
You can append and/or overwrite values from AFINN by simply injecting key/value pairs into a sentiment method call:
```javascript
var sentiment = require('sentiment');

var result = sentiment('Cats are totally amazing!', {
    'cats': 5,
    'amazing': 2  
});
console.dir(result);    // Score: 7, Comparative: 1.75
```

---

### Benchmarks
The primary motivation for designing `sentiment` was performance. As such, it includes a benchmark script within the test directory that compares it against the [Sentimental](https://github.com/thinkroth/Sentimental) module which provides a nearly equivalent interface and approach. Based on these benchmarks, running on an older MacBook Air with Node 0.10.26, `sentiment` is **more than twice as fast** as alternative implementations:

```bash
sentiment (Latest) x 244,901 ops/sec ±0.49% (100 runs sampled)
Sentimental (1.0.1) x 94,135 ops/sec ±0.50% (100 runs sampled)
```

To run the benchmarks yourself, simply:
```bash
make benchmark
```

---

### Testing
```bash
npm test
```