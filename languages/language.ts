import { ScoringStrategy } from "./scoring-strategy";

export interface Language {
    labels: { [index: string]: number; };
    scoringStrategy?: ScoringStrategy;
}
