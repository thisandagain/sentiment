var spellChecker = require ('spellchecker');
var distance = require('./distance');

/**
 * These two functions atempt to spell check and correct a given word, using
 * Levenshtein Distance to choose the most appropriate correction.
 * getSpellCheckedAfinnWord also looks for the word to be present on Afinn
 */
module.exports = {
    getSpellCheckedAfinnWord: function (afinn, word) {
        if (!afinn.hasOwnProperty(word) && spellChecker.isMisspelled(word)) {
            var checked = spellChecker.getCorrectionsForMisspelling(word);
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
        if (spellChecker.isMisspelled(word)) {
            var checked = spellChecker.getCorrectionsForMisspelling(word);
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
