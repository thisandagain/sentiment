var test = require('tap').test;
var sentiment = require('../../lib/index');

var dataset = 'i\'ll be there soon';
var result = sentiment(dataset);

test('synchronous positive', function (t) {
    t.type(result, 'object');
    t.equal(result.score, 0);
    t.equal(result.comparative, 0);
    t.equal(result.tokens.length, 4);
    t.equal(result.words.length, 0);
    t.end();
});
