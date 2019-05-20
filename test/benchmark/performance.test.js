/**
 * Runs benchmarks against sentiment and Sentimental.
 *
 * @package sentiment
 * @author Andrew Sliwinski <andrewsliwinski@acm.org>
 */

/**
 * Dependencies
 */
const { Suite } = require('benchmark');
const { Sentiment } = require('../../lib/src');
const sentimental = require('Sentimental');

/**
 * Test data
 */
const stringShort = 'This cat is totally awesome';
const { corpus } = require('../fixtures/corpus.json');
const sentiment = new Sentiment();
/**
 * Setup
 */
const suite = new Suite();
suite
    .add('sentiment (Latest)  - Short:', function () {
        sentiment.analyze(stringShort);
    })
    .add('sentiment (Latest)  - Long :', function () {
        sentiment.analyze(corpus);
    })
    .add('Sentimental (1.0.1) - Short:', function () {
        sentimental.analyze(stringShort);
    })
    .add('Sentimental (1.0.1) - Long :', function () {
        sentimental.analyze(corpus);
    })
    .on('cycle', function (event) {
        console.info(String(event.target) + '\n');
    })
    .run({
        minSamples: 100,
        delay: 2
    });
