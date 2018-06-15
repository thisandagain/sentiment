const tokenize = require('./tokenize');
const languageProcessor = require('./language-processor');

/**
 * Represents a Sentiment.
 * @constructor
 * @param {Object} options - Instance options
 */
const Sentiment = function(options) {
    this.options = options;
};

/**
 * Registers the specified language.
 * @param {string} languageCode - Two-digit code for the language to register.
 * @param {object} language - The language module to register.
 */
Sentiment.prototype.registerLanguage = (languageCode, language) => {
    languageProcessor.addLanguage(languageCode, language);
};

/**
 * Performs sentiment analysis on the provided input 'phrase'.
 * @param {string} phrase - Input phrase
 * @param {object} opts - Options
 * @param {object} opts.language - Input language code (2 digit code), defaults
 *                               to 'en'
 * @param {object} opts.extras - Optional sentiment additions to AFINN
 *                             (hash k/v pairs)
 * @param {function} callback - Optional callback
 * @return {object}
 */
Sentiment.prototype.analyze = (phrase, opts, callback) => {
    // Parse arguments
    if (typeof phrase === 'undefined') phrase = '';
    if (typeof opts === 'function') {
        callback = opts;
        opts = {};
    }
    opts = opts || {};

    const languageCode = opts.language || 'en';
    let labels = languageProcessor.getLabels(languageCode);

    // Merge extra labels
    if (typeof opts.extras === 'object') {
        labels = Object.assign(labels, opts.extras);
    }

    // Storage objects
    let tokens = tokenize(phrase);
    let score = 0;
    const words = [];
    const positive = [];
    const negative = [];

    // Iterate over tokens
    let i = tokens.length;
    while (i--) {
        const obj = tokens[i];
        if (!labels.hasOwnProperty(obj)) continue;
        words.push(obj);

        // Apply scoring strategy
        let tokenScore = labels[obj];
        // eslint-disable-next-line max-len
        tokenScore = languageProcessor.applyScoringStrategy(
            languageCode,
            tokens,
            i,
            tokenScore
        );
        if (tokenScore > 0) positive.push(obj);
        if (tokenScore < 0) negative.push(obj);
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
        process.nextTick(function() {
            callback(null, result);
        });
    } else {
        return result;
    }
};

module.exports = Sentiment;
