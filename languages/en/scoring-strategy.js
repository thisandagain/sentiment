var negated = require('./negation');

module.exports = {
    apply: function(tokens, cursor, tokenScore, spellCheck) {
        if (cursor > 0) {
            // Check for negation
            if (negated(tokens, cursor, spellCheck)) {
                tokenScore = -tokenScore;
            }
        }
        return tokenScore;
    }
};
