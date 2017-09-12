// Closest
//
// Finds the closest match between a statement
// and a body of words using Levenshtein
// Distance

var lev = require('levenshtein');
var tokenize = require('./tokenize');

module.exports = function(string, words) {

    var shortest = words.toString().length;
    var bestFit  = '';

    if (typeof words === 'string') {
        words = tokenize(words);
    }

    words.forEach(function(word) {

        var distance = lev(string, word);

        if (distance < shortest) {
            bestFit  = word;
            shortest = distance;
        }

    });

    return bestFit;
};
