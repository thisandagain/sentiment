var async       = require('async'),
    test        = require('tap').test,
    sentiment   = require(__dirname + '/../../lib/index');

function createRandomWord(length) {
    var consonants = 'bcdfghjklmnpqrstvwxyz!@#$%^&*()_+":;\'?><~`',
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
    sentiment(obj, callback);
}, function (err, obj) {
    console.dir(err);
    console.dir(obj);

    test('unit', function (t) {
        t.equal(err, null, 'error object should be null');
        t.type(obj, 'object', 'results should be an object');
        t.equal(obj.length, 100, 'results should be of expected length');
        
        t.end();
    });
});