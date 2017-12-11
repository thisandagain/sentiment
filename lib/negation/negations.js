var defaultNegationStrategy = {
    apply: function(cursor, tokens, item) {
      return item;
    }
}

module.exports = {

  /**
   * Returns a language-specific negation strategy
   *
   * @param {String} lang - Two-digit language code
   */
  getStrategyForLanguage: function(lang) {
    var negationStrategy;
    try {
      negationStrategy = require('./negation-' + lang);
    } catch (err) {
      // Fallback to default strategy
      negationStrategy = defaultNegationStrategy;
    }
    return negationStrategy;
  }
}
