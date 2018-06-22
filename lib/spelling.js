var nspell = require('nspell');
var distance = require('./distance');
var spellChecker = null;

/**
 * These two functions atempt to spell check and correct a given word, using
 * Levenshtein Distance to choose the most appropriate correction.
 * getSpellCheckedAfinnWord also looks for the word to be present on Afinn
 */
module.exports = {
    setUp: function(dictionaray) {
        spellChecker = nspell(dictionaray);
    },
    getSpellCheckedAfinnWord: function (afinn, word) {
        if (!afinn.hasOwnProperty(word) && !spellChecker.correct(word)) {
            var checked = spellChecker.suggest(word);
            if (checked.length === 0) {
                return word;
            } else {
                var closest = distance(word, checked);
                if (closest && afinn.hasOwnProperty(closest)) {
                    return closest;
                }
            }
        }
        return word;
    },

    getSpellCheckedWord: function (word) {
        if (!spellChecker.correct(word)) {
            var checked = spellChecker.suggest(word);
            if (checked.length === 0) {
                return word;
            } else {
                var closest = distance(word, checked);
                if (closest) {
                    return closest;
                }
            }
        }
        return word;
    }
};
