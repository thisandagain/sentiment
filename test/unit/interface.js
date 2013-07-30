var test        = require('tap').test,
    sentiment   = require(__dirname + '/../../lib/index');

test('unit', function (t) {
    t.type(sentiment, 'function', 'module should be a function');
    t.end();
});