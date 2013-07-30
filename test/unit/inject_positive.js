var test        = require('tap').test,
    sentiment   = require(__dirname + '/../../lib/index');

sentiment('This is so cool', {
    cool: 5
}, function (err, obj) {
    console.dir(err);
    console.dir(obj);

    test('unit', function (t) {
        t.equal(err, null, 'error object should be null');
        t.type(obj, 'object', 'results should be an object');
        t.equal(obj.score, 5, 'expected score');
        t.equal(obj.comparative, 1.25, 'expected comparative score');
        t.equal(obj.tokens.length, 4, 'expected tokens length');
        t.equal(obj.words.length, 1, 'expected match length');

        t.end();
    });
});