var test = require('tap').test;
var corpus = require('../fixtures/corpus');
var sentiment = require('../../lib/index');

var dataset = corpus;
var result = sentiment(dataset);
console.dir(result);

test('synchronous corpus', function (t) {
    t.type(result, 'object');
    t.equal(result.score, -7);
    t.equal(result.tokens.length, 1416);
    t.equal(result.words.length, 72);
    t.end();
});