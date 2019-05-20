import { Sentiment } from '../../src';

// Related issue: https://github.com/thisandagain/sentiment/issues/85
test('GH Issue 85 - Regex accidentally modifying words', () => {
    const sentiment = new Sentiment();
    const input = 'i\'ll be there soon';

    const result = sentiment.analyze(input);

    expect(typeof result).toBe('object');
    expect(result.score).toEqual(0);
    expect(result.comparative).toEqual(0);
    expect(result.tokens.length).toEqual(4);
    expect(result.words.length).toEqual(0);
});
