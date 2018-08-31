var negators = require("./negators.json");

module.exports = {
  apply: function(tokens, cursor, tokenScore) {
    if (cursor > 0) {
      let prevtoken = tokens[cursor - 1];
      if (negators[prevtoken]) {
        tokenScore = -tokenScore;
      }
    }
    return tokenScore;
  }
};
