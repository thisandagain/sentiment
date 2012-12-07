/**
 * Test suite
 *
 * @package sentiment
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var async   = require('async'),
    test    = require('tap').test,

    target  = require(__dirname + '/../lib/index.js');

/**
 * Suite
 */
async.auto({

    negative:  function (callback) {
        target('Hey you worthless scumbag', callback);
    },

    positive:  function (callback) {
        target('This is so cool', callback);
    },

    n2:         function (callback) {
        target('Cats are stupid.', callback);
    },

    p2:         function (callback) {
        target('Cats are totally amazing!', callback);
    },

    bb:         function (callback) {
        var load = [
            'In America I doubt it could sustain itself without descending into identity politics and ego.',
            'You are deluding yourself if you think that identity politics and ego are purely American.',
            'Posting a show that cost $5 and was for charity is pretty low and I thought better of BoingBoing. A clip or two would be great, but just pirating something like this is lame.',
            'I paid the $5, only got to see the last 30 minutes of the event, and cant download it today, because when I log in, it asks for my credit card information. So the only way it looks like Ill get to watch it is through a pirated copy.',
            'Thanks for posting it, Cory! What Ive seen of the debate was awesome, but from a technical and customer service standpoint, it was a catastrophe.',
            'Bill OReillys total inability to shut up while anyone else is speaking makes me either wonder how he ever got his job, or think that you can be inordinately successful just by bullying.'
        ];

        async.map(load, function (obj, callback) {
            target(obj, callback);
        }, callback);
    },

    fuzz:       function (callback) {
        function createRandomWord(length) {
            var consonants = 'bcdfghjklmnpqrstvwxyz',
                vowels = 'aeiou',
                rand = function(limit) {
                    return Math.floor(Math.random()*limit);
                },
                i, word='', length = parseInt(length,10),
                consonants = consonants.split(''),
                vowels = vowels.split('');
            for (i=0;i<length/2;i++) {
                var randConsonant = consonants[rand(consonants.length)],
                    randVowel = vowels[rand(vowels.length)];
                word += (i===0) ? randConsonant.toUpperCase() : randConsonant;
                word += i*2<length-1 ? randVowel : '';
            }
            return word;
        }

        var lines = [];
        for (var i = 0; i < 100; i++) {
            var line = '';
            for (var x = 0; x < Math.round(Math.random() * 20); x++) {
                line = line + createRandomWord(Math.round(Math.random() * 12)) + ' ';
            }
            lines.push(line);
        }

        async.map(lines, function (obj, callback) {
            target(obj, callback);
        }, callback);
    },

    test:   ['negative', 'positive', 'n2', 'p2', 'bb', 'fuzz', function (callback, obj) {
        test('Component definition', function (t) {
            t.type(target, 'function', 'Component should be a function');
            t.end();
        });

        test('Negative test case', function (t) {
            t.type(obj.negative, 'object', 'Results should be an object');
            t.equal(obj.negative.score, -6, 'Expected score');
            t.equal(obj.negative.comparative, -1.5, 'Expected comparative score');
            t.equal(obj.negative.tokens.length, 4, 'Expected tokens length');
            t.equal(obj.negative.words.length, 2, 'Expected match length');
            t.end();
        });

        test('Positive test case', function (t) {
            t.type(obj.positive, 'object', 'Results should be an object');
            t.equal(obj.positive.score, 1, 'Expected score');
            t.equal(obj.positive.comparative, 0.25, 'Expected comparative score');
            t.equal(obj.positive.tokens.length, 4, 'Expected tokens length');
            t.equal(obj.positive.words.length, 1, 'Expected match length');
            t.end();
        });

        test('BB.net test', function (t) {
            t.type(obj.bb, 'object', 'Results should be an object');
            t.equal(obj.bb.length, 6, 'Expected score');
            t.end();
        });

        test('Fuzz test', function (t) {
            t.type(obj.fuzz, 'object', 'Results should be an object');
            t.equal(obj.fuzz.length, 100, 'Expected score');
            t.end();
        });

        callback();
    }]

}, function (err, obj) {
    test('Catch errors', function (t) {
        t.equal(err, null, 'Errors should be null');
        t.end();
    });
});
