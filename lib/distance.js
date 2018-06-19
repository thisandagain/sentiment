var lev = require('levenshtein');

/**
 * Finds the closest match between a statement and a body of words using
 * Levenshtein Distance
 * 
 * @param  {string} string Input string
 * @param  {string/array} words List of strings to find closest
 * @return {string} The closest word in the list
 */
module.exports = function(string, words) {

    var shortest = words.toString().length;
    var bestFit  = '';

    words.forEach(function(word) {

        var distance = lev(string, word);

        if (distance < shortest) {
            bestFit  = word;
            shortest = distance;
        }

    });

    return bestFit;
};
