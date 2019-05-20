import { Sentiment } from './sentiment-analyzer';

export { AnalyzeOptions } from './sentiment-analyzer';
export { LanguageProcessor, LanguageInput } from './language-processor';
export { tokenize } from './tokenize';
export { ScoringStrategy } from '../languages/scoring-strategy';
export { Sentiment };

const sentiment = new Sentiment();

export default sentiment;
