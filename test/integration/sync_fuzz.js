var test = require('tap').test;
var fuzz = require('../fixtures/fuzz');
var sentiment = require('../../lib/index');

var input = fuzz(1000);

test('synchronous fuzz', function (t) {
    t.type(sentiment.analyze(input), 'object');
    t.end();
});
