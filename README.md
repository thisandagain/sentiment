## sentiment
#### AFINN-based sentiment analysis for Node.js

[![Build Status](https://secure.travis-ci.org/thisandagain/sentiment.png)](http://travis-ci.org/thisandagain/sentiment)

Sentiment is a Node.js module that uses the [AFINN-111](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) wordlist to perform [sentiment analysis](http://en.wikipedia.org/wiki/Sentiment_analysis) on arbitrary blocks of input text. Sentiment provides serveral things:
- A fully async interface for performing sentiment analysis
- A build process that makes updating sentiment to future versions of the AFINN word list trivial
- Performance (see benchmarks below)

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

### Testing
```bash
npm test
```

### Benchmarks
The primary motivation for designing `sentiment` was performance. As such, `sentiment` includes a benchmark script within the test directory that compares it against the [Sentimental](https://github.com/thinkroth/Sentimental) module which provides a nearly equivalent interface and approach. Based on these benchmarks, running on an older MacBook Air with Node 0.8.9, `sentiment` is about 33 times faster than the alternative implementation:
```bash
sentiment (v0.1.0)
1000 operations  |  33ms
2000 operations  |  75ms
4000 operations  |  138ms
8000 operations  |  252ms
16000 operations |  506ms
32000 operations |  1120ms
64000 operations |  2268ms

--------------------------
--------------------------

Sentimental (v0.0.2)
1000 operations  |  1189ms
2000 operations  |  2392ms
4000 operations  |  4760ms
8000 operations  |  9469ms
16000 operations |  19513ms
32000 operations |  41018ms
64000 operations |  86931ms
```