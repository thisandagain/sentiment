/**
 * Naïve benchmark suite.
 *
 * @package sentiment
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var async   = require('async'),
    test    = require('tap').test,

    t1      = require(__dirname + '/../../lib/index.js'),
    t2      = require('Sentimental');

/**
 * Benchmark
 */
function bench () {
    var limit = 2000;
    var a = [];
    var p = [
        'In America I doubt it could sustain itself without descending into identity politics and ego.',
        'You are deluding yourself if you think that identity politics and ego are purely American.',
        'Posting a show that cost $5 and was for charity is pretty low and I thought better of BoingBoing. A clip or two would be great, but just pirating something like this is lame.',
        'I paid the $5, only got to see the last 30 minutes of the event, and cant download it today, because when I log in, it asks for my credit card information. So the only way it looks like Ill get to watch it is through a pirated copy.',
        'Thanks for posting it, Cory! What Ive seen of the debate was awesome, but from a technical and customer service standpoint, it was a catastrophe.',
        'Bill OReillys total inability to shut up while anyone else is speaking makes me either wonder how he ever got his job, or think that you can be inordinately successful just by bullying.'
    ];

    for (var i = 0; i < limit; i++) {
        a.push(p[i % p.length]);
    }
    return a;
}

/**
 * Suite
 */
async.auto({

    target:  function (callback) {
        var totalTime,
            start = new Date,
            iterations = 6;

        async.map(bench(), function (obj, callback) {
            t1(obj, callback);
        }, function (err, results) {
            callback(err, {
                count: results.length,
                time:   new Date - start
            });
        });
    },

    compare: ['target', function (callback) {
        var totalTime,
            start = new Date,
            iterations = 6;

        async.map(bench(), function (obj, callback) {
            callback(null, t2.analyze(obj));
        }, function (err, results) {
            callback(err, {
                count: results.length,
                time:   new Date - start
            });
        });
    }],

}, function (err, obj) {
    console.dir(obj);
    test('Catch errors', function (t) {
        t.equal(err, null, 'Errors should be null');
        t.end();
    });
});