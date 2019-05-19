export interface ScoringStrategy {
    apply: (tokens: string[], cursor: number, tokenScore: number) => any;
}