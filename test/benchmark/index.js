/**
 * Runs benchmarks against sentiment and Sentimental.
 *
 * @package sentiment
 * @author Andrew Sliwinski <andrewsliwinski@acm.org>
 */

/**
 * Dependencies
 */
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

var sentiment = require('../../lib/index');
var sentimental = require('Sentimental');

/**
 * Test data
 */
var stringShort = 'This cat is totally awesome';

/**
 * Setup
 */
suite
    .add('sentiment (Latest)', function () {
        sentiment(stringShort);
    })
    .add('Sentimental (1.0.1)', function () {
        sentimental.analyze(stringShort);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({
        minSamples: 100,
        delay: 2
    });