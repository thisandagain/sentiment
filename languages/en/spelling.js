var read = require('fs').readFileSync;
var nspell = require('nspell');
var distance = require('./distance');

function loadDictionary() {
    var base = require.resolve('dictionary-en-us');
    var result = {
        'aff': read(base.replace('.js', '.aff'), 'utf-8'),
        'dic': read(base.replace('.js', '.dic'), 'utf-8')
    };
    return result;
}

var spell = null;

function getSpellChecker() {
    if (spell === null) {
        var dictionaray = loadDictionary();
        spell = nspell(dictionaray);
    }
    return spell;
}

/**
 * These two functions atempt to spell check and correct a given word, using
 * Levenshtein Distance to choose the most appropriate correction.
 * getSpellCheckedAfinnWord also looks for the word to be present on Afinn
 */
module.exports = {
    getSpellCheckedAfinnWord: function (afinn, word) {
        var spellChecker = getSpellChecker();
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
        var spellChecker = getSpellChecker();
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
