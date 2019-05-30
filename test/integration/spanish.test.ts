import { Sentiment } from '../../src';

test('Spanish Language', () => {
    const sentiment = new Sentiment();
    
    const positive = 'los gatos son adorables';
    const positiveResult = sentiment.analyze(positive, {
        languageCode: 'es'
    });
    expect(positiveResult.score).toBeGreaterThan(0);

    const negative = 'odio a esas personas';
    const negativeResult = sentiment.analyze(negative, {
        languageCode: 'es'
    });
    expect(negativeResult.score).toBeLessThan(0);
});