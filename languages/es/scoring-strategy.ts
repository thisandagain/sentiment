import { ScoringStrategy } from '../scoring-strategy';
import negators from './negators.json';
import { Negators } from '../negators';

const _negators: Negators = negators;

export const scoringStrategy: ScoringStrategy = (tokens: string[], cursor: number, tokenScore: number) => {
    // Check if the previous token is a negator
    if (cursor > 0) {
        const prevtoken = tokens[cursor - 1];
        if (_negators[prevtoken]) {
            tokenScore = -tokenScore;
        }
    }
    return tokenScore;
};
