var test = require('tap').test;
var sentiment = require('../../lib/index');

var dataset = 'This is so cool 😃';
sentiment(dataset, function (err, result) {
    test('asynchronous positive text and emoji', function (t) {
        t.type(result, 'object');
        t.equal(result.score, 3);
        t.equal(result.comparative, 0.6);
        t.equal(result.tokens.length, 5);
        t.equal(result.words.length, 2);
        t.end();
    });
});
