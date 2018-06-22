var test = require('tap').test;
var Sentiment = require('../../lib/index');
var sentiment = new Sentiment();

var input = 'this is not very bad';
var result = sentiment.analyze(input);

test('synchronous negation', function (t) {
    t.type(result, 'object');
    t.equal(result.score, 3);
    t.equal(result.comparative, 0.6);
    t.equal(result.tokens.length, 5);
    t.equal(result.words.length, 1);
    t.end();
});
