var test        = require('tap').test,
    sentiment   = require(__dirname + '/../../lib/index');

var foo = {
    bar: 'hello'
};

sentiment(foo.nil, function (err, obj) {
    console.dir(err);
    console.dir(obj);

    test('unit', function (t) {
        t.equal(err, null, 'error object should be null');
        t.type(obj, 'object', 'results should be an object');
        t.end();
    });
});