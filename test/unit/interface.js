var test = require('tap').test;
var sentiment = require('../../lib/index');

test('interface', function (t) {
    t.type(sentiment, 'function', 'module is a function');
    t.type(sentiment('test'), 'object');
    t.type(sentiment('test', {test: 10}), 'object');
    t.end();
});
