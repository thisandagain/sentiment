var test = require('tap').test;
var sentiment = require('../../lib/index');

var dataset = 'C\'était vraiment bien 😃';
var result = sentiment(dataset, 'fr', { 'bien': 100 });

test('synchronous inject FR', function (t) {
    t.type(result, 'object');
    t.equal(result.score, 102);
    t.equal(result.comparative, 25.5);
    t.equal(result.tokens.length, 4);
    t.equal(result.words.length, 2);
    t.end();
});
