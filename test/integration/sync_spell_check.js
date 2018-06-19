var test = require('tap').test;
var Sentiment = require('../../lib/index');
var sentiment = new Sentiment();

var input = 'I hatee you';
var result = sentiment.analyze(input, { spellCheck: true });

test('synchronous spell checking active', function (t) {
    t.type(result, 'object');
    t.equal(result.score, -3);
    t.equal(result.comparative, -1);
    t.equal(result.tokens.length, 3);
    t.equal(result.words.length, 1);
    t.end();
});

result = sentiment.analyze(input);

test('synchronous spell checking inactive', function (t) {
    t.type(result, 'object');
    t.equal(result.score, 0);
    t.equal(result.comparative, 0);
    t.equal(result.tokens.length, 3);
    t.equal(result.words.length, 0);
    t.end();
});

result = sentiment.analyze('I dontt hate you', { spellCheck: true });

test('synchronous spell checking active with negation', function (t) {
    t.type(result, 'object');
    t.equal(result.score, 3);
    t.equal(result.comparative, 0.75);
    t.equal(result.tokens.length, 4);
    t.equal(result.words.length, 1);
    t.end();
});