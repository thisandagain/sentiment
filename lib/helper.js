var afinn_translations = require('afinn-165-multilingual').afinn_translations;
var emojis = require('../build/emoji.json');
var negations = require('./negation/negations');

// Remove empty string entry
delete afinn_translations.afinn_en[''];

// Cache for language-specific resources
// English is loaded by default
var languages = {
    en: {
        translations: Object.assign(emojis, afinn_translations.afinn_en),
        negation: require('./negation/negation-en')
    }
};

module.exports = {

    /**
     * Returns AFIN-165 translations for the specified language.
     *
     * @param {String} lang - Two-digit language code of the translations
     *
     * @return {Object}
     */
    getTranslations: function(lang) {
        if (!lang) {
            // Default to english if no language was specified
            return languages.en.translations;
        }
        if (!languages[lang]) {
            // Load translations for specified language
            var translations = afinn_translations['afinn_' + lang];
            if (!translations) {
                throw new Error('No translations found for language: ' + lang);
            }
            delete translations[''];
            translations = Object.assign(emojis, translations);

            // Lookup negation strategy
            var negationStrategy = negations.getStrategyForLanguage(lang);

            // Add language resources to in-memory cache
            languages[lang] = {
                negation: negationStrategy,
                translations: translations
            };
        }
        return languages[lang].translations;
    },

    /**
     * Applies a predefined strategy for considering negation constructs
     *
     * @param {String} lang - Two-digit language code
     * @param {int} cursor - Iteration cursor
     * @param {Array} tokens - Tokens of the phrase to analyze
     * @param {item} item - The current token being analyzed
     */
    applyNegationStrategy: function(lang, cursor, tokens, item) {
        if (!languages[lang]) {
            throw new Error('No entry found for language: ', lang);
        }
        return languages[lang].negation.apply(cursor, tokens, item);
    }
};
