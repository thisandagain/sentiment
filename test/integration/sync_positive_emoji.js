var test = require('tap').test;
var sentiment = require('../../lib/index');

var dataset = 'This is so cool 😃';
var result = sentiment(dataset);

test('synchronous positive with emoji', function (t) {
    t.type(result, 'object');
    t.equal(result.score, 6);
    t.equal(result.comparative, 1.2);
    t.equal(result.tokens.length, 5);
    t.equal(result.words.length, 2);
    t.end();
});
