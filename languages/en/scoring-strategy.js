var negated = require('./negation');

module.exports = {
    apply: function(tokens, cursor, tokenScore) {
        if (cursor > 0) {
            // Check for negation
            if (negated(tokens, cursor)) {
                tokenScore = -tokenScore;
            }
        }
        return tokenScore;
    }
};
