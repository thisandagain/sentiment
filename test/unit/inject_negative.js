var test        = require('tap').test,
    sentiment   = require(__dirname + '/../../lib/index');

sentiment('Hey you worthless scumbag', {
    worthless: -5,
    scumbag: -5
}, function (err, obj) {
    console.dir(err);
    console.dir(obj);

    test('unit', function (t) {
        t.equal(err, null, 'error object should be null');
        t.type(obj, 'object', 'results should be an object');
        t.equal(obj.score, -10, 'expected score');
        t.equal(obj.comparative, -2.5, 'expected comparative score');
        t.equal(obj.tokens.length, 4, 'expected tokens length');
        t.equal(obj.words.length, 2, 'expected match length');

        t.end();
    });
});