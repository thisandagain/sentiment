var defaultNegationStrategy = {
    apply: function(cursor, tokens, item) {
      return item;
    }
}

module.exports = {

  /**
   *
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
