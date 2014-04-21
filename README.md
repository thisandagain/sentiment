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

sentiment('Cats are stupid.', function (err, result) {
    console.dir(result);    // Score: -2, Comparative: -0.666
});

sentiment('Cats are totally amazing!', function (err, result) {
    console.dir(result);    // Score: 4, Comparative: 1
});
```

### Adding / overwriting words
You can append and/or overwrite values from AFINN by simply injecting key/value pairs into a sentiment method call:
```javascript
var sentiment = require('sentiment');

sentiment('Cats are totally amazing!', {
    'cats': 5,
    'amazing': 2  
}, function (err, result) {
    console.dir(result);    // Score: 7, Comparative: 1.75
});
```

---

### Benchmarks
The primary motivation for designing `sentiment` was performance. As such, `sentiment` includes a benchmark script within the test directory that compares it against the [Sentimental](https://github.com/thinkroth/Sentimental) module which provides a nearly equivalent interface and approach. Based on these benchmarks, running on an older MacBook Air with Node 0.10.26, `sentiment` is about 1.5x - 2x as fast as alternative implementations:
```bash
sentiment (v0.3.0)
1000 operations   |  29ms
2000 operations   |  57ms
4000 operations   |  128ms
8000 operations   |  252ms
16000 operations  |  540ms
32000 operations  |  969ms
64000 operations  |  2014ms
128000 operations |  3854ms

--------------------------
--------------------------

Sentimental (v1.0.1)
1000 operations   |  75ms
2000 operations   |  108ms
4000 operations   |  215ms
8000 operations   |  415ms
16000 operations  |  715ms
32000 operations  |  2636ms
64000 operations  |  3126ms
128000 operations |  6100ms
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