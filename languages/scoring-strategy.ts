
/**
 * A type for a function used in computing the score of a token.
 *
 * @export
 * @interface ScoringStrategy
 */
export interface ScoringStrategy {
    /**
     * @param {string[]} tokens The tokens/labels from the language used for analysis
     * @param {number} cursor An index that points to the current word in the tokens array
     * @param {number} tokenScore The score of the current token from the associated language
     * @returns {number} A final computed score for the current token
     */
    (tokens: string[], cursor: number, tokenScore: number): number;
}
