var test = require('tap').test;
var sentiment = require('../../lib/index');

var dataset = 'Hey you worthless scumbag ⚠';
var result = sentiment(dataset);

test('synchronous negative with emoji', function (t) {
    t.type(result, 'object');
    t.equal(result.score, -7);
    t.equal(result.comparative, -1.4);
    t.equal(result.tokens.length, 5);
    t.equal(result.words.length, 3);
    t.end();
});
