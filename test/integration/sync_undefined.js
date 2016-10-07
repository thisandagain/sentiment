var test = require('tap').test;
var sentiment = require('../../lib/index');

var result = sentiment(undefined);

test('synchronous positive', function (t) {
    t.type(result, 'object');
    t.equal(result.score, 0);
    t.equal(result.comparative, 0);
    t.equal(result.tokens.length, 1);
    t.equal(result.words.length, 1);
    t.end();
});
