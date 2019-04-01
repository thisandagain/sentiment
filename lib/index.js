const tokenize = require('./tokenize');
const languageProcessor = require('./language-processor');

class Sentiment {
    /**
     * Represents a Sentiment.
     * @constructor
     * @param {Object} options - Instance options.
     */
    constructor(options) {
        this.options = options;
    }
    /**
     * Registers the specified language.
     * @param {string} languageCode - Two-digit code for the language to
     *                              register.
     * @param {object} language - The language module to register.
     */
    registerLanguage(languageCode, language) {
        languageProcessor.addLanguage(languageCode, language);
    }
    /**
     * Performs sentiment analysis on the provided input 'phrase'.
     * @param {string} phrase - Input phrase
     * @param {object} opts - Options
     * @param {object} opts.language - Input language code (2 digit code),
     *                               defaults to 'en'
     * @param {object} opts.extras - Optional sentiment additions to AFINN
     *                             (hash k/v pairs)
     * @param {function} callback - Optional callback
     * @return {object}
     */
    analyze(phrase = '', opts = { language: 'en' }, callback) {
        // Storage objects
        const tokens = tokenize(phrase);
        let score = 0;
        let words = [];
        let positive = [];
        let negative = [];

        // Parse arguments
        if (typeof opts === 'function') {
            callback = opts;
            opts = {};
        }

        const languageCode = opts.language;
        let labels = languageProcessor.getLabels(languageCode);

        // Merge extra labels
        if (typeof opts.extras === 'object') {
            labels = Object.assign(labels, opts.extras);
        }

        // Iterate over tokens
        let i = tokens.length;
        while (i--) {
            const obj = tokens[i];
            if (!labels.hasOwnProperty(obj)) continue;
            words = words.concat(obj);
            // Apply scoring strategy
            const tokenScore = languageProcessor.applyScoringStrategy(
                languageCode,
                tokens,
                i,
                labels[obj]
            );
            if (tokenScore > 0) {
                positive = positive.concat(obj);
            }
            if (tokenScore < 0) {
                negative = negative.concat(obj);
            }
            score += tokenScore;
        }

        const result = {
            score,
            comparative: tokens.length > 0 ? score / tokens.length : 0,
            tokens,
            words,
            positive,
            negative
        };

        // Handle optional async interface
        if (typeof callback === 'function') {
            process.nextTick(() => {
                callback(null, result);
            });
        } else {
            return result;
        }
    }
}

module.exports = Sentiment;
