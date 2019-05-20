import { Sentiment } from '../../src';

test('Undefined Input', () => {
    const sentiment = new Sentiment();
    const input = undefined;

    expect(() => sentiment.analyze(input as any)).toThrow();
});
