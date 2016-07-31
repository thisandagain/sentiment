var test = require('tap').test;
var sentiment = require('../../lib/index');

var result = sentiment(undefined);

test('synchronous undefined', function (t) {
    t.type(result, 'object');
    t.equal(result.score, 0);
    t.notOk(result.comparative);
    t.equal(result.tokens.length, 0);
    t.equal(result.words.length, 0);
    t.end();
});
