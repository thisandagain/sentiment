var test = require('tap').test;
var sentiment = require('../../lib/index');

var dataset = 'Hey you worthless scumbag 😦';
sentiment(dataset, function (err, result) {
    test('asynchronous negative text and emoji', function (t) {
        t.type(result, 'object');
        t.equal(result.score, -8);
        t.equal(result.comparative, -1.6);
        t.equal(result.tokens.length, 5);
        t.equal(result.words.length, 3);
        t.end();
    });
});
