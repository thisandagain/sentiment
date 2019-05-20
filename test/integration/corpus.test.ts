import { Sentiment } from '../../src';
import { corpus } from '../fixtures/corpus.json';

test('Corpus', () => {
    const sentiment = new Sentiment();

    const result = sentiment.analyze(corpus);

    expect(typeof result).toBe('object');
    expect(result.score).toBe(-3);
    expect(result.tokens.length).toBe(1416);
    expect(result.words.length).toBe(73);
});
