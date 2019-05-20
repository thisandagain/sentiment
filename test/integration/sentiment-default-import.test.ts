import sentiment from '../../src';

test('Sentiment Default Import', () => {
    const input = 'This is so cool';

    const result = sentiment.analyze(input);

    expect(result.score).toBeGreaterThan(0);

    expect(typeof result).toEqual('object');
    expect(result.score).toBe(1);
    expect(result.comparative).toBeCloseTo(0.25);
    expect(result.tokens.length).toBe(4);
    expect(result.words.length).toBe(1);
    expect(result.words).toContain('cool');
});
