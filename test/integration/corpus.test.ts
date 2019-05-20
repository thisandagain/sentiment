import { Sentiment } from '../../src';
import { corpus } from '../fixtures/corpus';

test('Corpus', async () => {
    const sentiment = new Sentiment();

    const result = await sentiment.analyze(corpus);

    expect(typeof result).toBe('object');
    expect(result.score).toBe(-3);
    expect(result.tokens.length).toBe(1416);
    expect(result.words.length).toBe(73);
});
