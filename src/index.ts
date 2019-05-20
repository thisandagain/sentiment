import { Sentiment } from './sentiment-analyzer';

export { AnalyzeOptions } from './sentiment-analyzer';
export { LanguageProcessor } from './language-processor';
export { tokenize } from './tokenize';
export { Language } from '../languages/language';
export { ScoringStrategy } from '../languages/scoring-strategy';
export { Sentiment };

const sentiment = new Sentiment();

export default sentiment;
