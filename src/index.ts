import { Sentiment } from './sentiment-analyzer';

export { LanguageProcessor } from './language-processor';
export { tokenize } from './tokenize';
export { Sentiment };

const sentiment = new Sentiment();

export default sentiment;
