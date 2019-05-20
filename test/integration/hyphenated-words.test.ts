import { Sentiment } from '../../src';

// Related issue: https://github.com/thisandagain/sentiment/issues/12
test('Hyphenated Words', () => {
    const sentiment = new Sentiment();
    const input = 'self-deluded';

    const result = sentiment.analyze(input);

    expect(typeof result).toBe('object');
    expect(result.score).toEqual(-2);
    expect(result.comparative).toEqual(-2);
    expect(result.tokens.length).toEqual(1);
    expect(result.words.length).toEqual(1);
});
