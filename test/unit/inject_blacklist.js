var test        = require('tap').test,
    sentiment   = require(__dirname + '/../../lib/index');

sentiment('I really like your badword cat! It is super cool and amazing.', {
    badword: -100
}, function (err, obj) {
    console.dir(err);
    console.dir(obj);

    test('unit', function (t) {
        t.equal(err, null, 'error object should be null');
        t.type(obj, 'object', 'results should be an object');
        t.equal(obj.score, -90, 'expected score');
        t.equal(obj.comparative, -7.5, 'expected comparative score');
        t.equal(obj.tokens.length, 12, 'expected tokens length');
        t.equal(obj.words.length, 5, 'expected match length');

        t.end();
    });
});