var test = require('tap').test;
var sentiment = require('../../lib/index');

var dataset = 'Hey you worthless scumbag';
sentiment(dataset, function (err, result) {
    test('asynchronous negative', function (t) {
        t.type(result, 'object');
        t.equal(result.score, -6);
        t.equal(result.comparative, -1.5);
        t.equal(result.tokens.length, 4);
        t.equal(result.words.length, 2);
        t.end();
    });
});
