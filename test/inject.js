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
        target('Hey you worthless scumbag', {
            worthless: -5,
            scumbag: -5
        }, callback);
    },

    positive:  function (callback) {
        target('This is so cool', {
            cool: 5
        }, callback);
    },

    blacklist: function (callback) {
        target('I really like your badword cat!', {
            badword: -100
        }, callback);
    },

    mix:        function (callback) {
        target('I really like your badword cat! It is super cool and amazing.', {
            badword: -100
        }, callback);
    },

    p1:  function (callback) {
        target('Cats are totally amazing!', {
            'cats': 5,
            'amazing': 2  
        }, callback);
    },

    test:   ['negative', 'positive', 'blacklist', 'mix', 'p1', function (callback, obj) {
        console.dir(obj);

        test('Component definition', function (t) {
            t.type(target, 'function', 'Component should be a function');
            t.end();
        });

        test('negative', function (t) {
            t.type(obj.negative, 'object', 'Results should be an object');
            t.equal(obj.negative.score, -10, 'Expected score');
            t.equal(obj.negative.comparative, -2.5, 'Expected comparative score');
            t.equal(obj.negative.tokens.length, 4, 'Expected tokens length');
            t.equal(obj.negative.words.length, 2, 'Expected match length');
            t.end();
        });

        test('positive', function (t) {
            t.type(obj.positive, 'object', 'Results should be an object');
            t.equal(obj.positive.score, 5, 'Expected score');
            t.equal(obj.positive.comparative, 1.25, 'Expected comparative score');
            t.equal(obj.positive.tokens.length, 4, 'Expected tokens length');
            t.equal(obj.positive.words.length, 1, 'Expected match length');
            t.end();
        });

        test('blacklist', function (t) {
            t.type(obj.blacklist, 'object', 'Results should be an object');
            t.equal(obj.blacklist.score, -98, 'Expected score');
            t.equal(obj.blacklist.comparative, -16.333333333333332, 'Expected comparative score');
            t.equal(obj.blacklist.tokens.length, 6, 'Expected tokens length');
            t.equal(obj.blacklist.words.length, 2, 'Expected match length');
            t.end();
        });

        test('mix', function (t) {
            t.type(obj.mix, 'object', 'Results should be an object');
            t.equal(obj.mix.score, -86, 'Expected score');
            t.equal(obj.mix.comparative, -7.166666666666667, 'Expected comparative score');
            t.equal(obj.mix.tokens.length, 12, 'Expected tokens length');
            t.equal(obj.mix.words.length, 5, 'Expected match length');
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
