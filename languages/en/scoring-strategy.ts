import { ScoringStrategy } from '../scoring-strategy';
import negators from './negators.json';

type Negators = { [index: string]: number };
const _negators: Negators = negators;

export const scoringStrategy: ScoringStrategy = {
    apply: (tokens: string[], cursor: number, tokenScore: number) => {
        // Check if the previous token is a negator
        if (cursor > 0) {
            const prevtoken = tokens[cursor - 1];
            if (_negators[prevtoken]) {
                tokenScore = -tokenScore;
            }
        }
        return tokenScore;
    }
};
