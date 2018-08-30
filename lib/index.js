const tokenize = require("./tokenize");
const languageProcessor = require("./language-processor");

/**
 * Constructor
 * @param {Object} options - Instance options
 */
let Sentiment = function(options) {
  this.options = options;
};

/**
 * Registers the specified language
 *
 * @param {String} languageCode
 *     - Two-digit code for the language to register
 * @param {Object} language
 *     - The language module to register
 */
Sentiment.prototype.registerLanguage = function(languageCode, language) {
  languageProcessor.addLanguage(languageCode, language);
};

/**
 * Performs sentiment analysis on the provided input 'phrase'.
 *
 * @param {String} phrase
 *     - Input phrase
 * @param {Object} opts
 *     - Options
 * @param {Object} opts.language
 *     - Input language code (2 digit code), defaults to 'en'
 * @param {Object} opts.extras
 *     - Optional sentiment additions to AFINN (hash k/v pairs)
 * @param {function} callback
 *     - Optional callback
 * @return {Object}
 */
Sentiment.prototype.analyze = function(phrase, opts, callback) {
  // Parse arguments
  if (typeof phrase === "undefined") phrase = "";
  if (typeof opts === "function") {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  let languageCode = opts.language || "en";
  let labels = languageProcessor.getLabels(languageCode);

  // Merge extra labels
  if (typeof opts.extras === "object") {
    labels = Object.assign(labels, opts.extras);
  }

  // Storage objects
  let tokens = tokenize(phrase),
    score = 0,
    words = [],
    positive = [],
    negative = [];

  // Iterate over tokens
  let i = tokens.length;
  while (i--) {
    let obj = tokens[i];
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

  let result = {
    score: score,
    comparative: tokens.length > 0 ? score / tokens.length : 0,
    tokens: tokens,
    words: words,
    positive: positive,
    negative: negative
  };

  // Handle optional async interface
  if (typeof callback === "function") {
    process.nextTick(function() {
      callback(null, result);
    });
  } else {
    return result;
  }
};

module.exports = Sentiment;
