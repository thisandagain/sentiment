import { ScoringStrategy, LanguageInput, LanguageProcessor } from '../../src';

import englishLabels from '../../languages/en/labels.json';
import emojis from '../../emoji/emoji.json';

describe('LanguageProcessor', () => {
    describe('#constructor', () => {
        it('returns an instance of LanguageProcessor when given 0 arguments', () => {
            expect(() => new LanguageProcessor()).not.toThrow();
            expect(new LanguageProcessor()).toBeDefined();
        });
    });

    describe('#getLanguage', () => {
        it('returns the default language English when given "en"', () => {
            const languageProcessor = new LanguageProcessor();

            const language = languageProcessor.getLanguage('en');

            expect(language).toBeDefined();
            expect(language.labels).toBeDefined();
            expect(language.scoringStrategy).toBeDefined();
            expect(language.scoringStrategy!.apply).toBeDefined();
        });

        it('throws an error when given a language code that does not exist', () => {
            const languageProcessor = new LanguageProcessor();

            expect(() => languageProcessor.getLanguage('fake')).toThrow();
        });
    });

    describe('#getLabels', () => {
        it('returns the labels for english when given "en"', () => {
            const languageProcessor = new LanguageProcessor();

            const labels = languageProcessor.getLabels('en');

            expect(labels).toEqual(englishLabels);
        });

        it('throws an error when given a language code that does not exist', () => {
            const languageProcessor = new LanguageProcessor();

            return expect(() => languageProcessor.getLabels('fake')).toThrow();
        });
    });

    describe('#addLanguage', () => {
        it('successfully adds a new language when given labels as well as combining them with emojis',
            () => {
                const languageProcessor = new LanguageProcessor();
                const languageCode = 'fr';
                const lang: LanguageInput = {
                    labels: {
                        a: 2,
                        b: -1
                    }
                };

                languageProcessor.addLanguage(languageCode, lang);
                const result = languageProcessor.getLanguage(languageCode);
                return expect(result.labels).toEqual({ ...lang.labels, ...emojis });
            }
        );

        it('successfully adds a new language when given labels and scoring strategy', () => {
            const languageProcessor = new LanguageProcessor();
            const languageCode = 'fr';
            const scoringStrategy: ScoringStrategy = (_tokens, _cursor, tScore) => {
                return tScore;
            };
            const lang: LanguageInput = {
                labels: {
                    a: 5,
                    b: -3
                },
                scoringStrategy
            };

            languageProcessor.addLanguage(languageCode, lang);
            const result = languageProcessor.getLanguage(languageCode);

            expect(result.labels).toBeDefined();
            expect(result.scoringStrategy).toBeDefined();
            expect(result.labels).toHaveProperty('a');
            expect(result.labels).toHaveProperty('b');
            expect(result.labels.a).toBe(5);
            expect(result.labels.b).toBe(-3);
        });

        it('will successfully use given scoring strategy', () => {
            const languageProcessor = new LanguageProcessor();
            const languageCode = 'aa';

            const scoringStrategy: ScoringStrategy = (_tokens, _cursor, _tScore) => {
                return 100;
            };

            languageProcessor.addLanguage(languageCode, {
                labels: { foo: 1 },
                scoringStrategy
            });

            const language = languageProcessor.getLanguage(languageCode);
            const result = language!.scoringStrategy(['foo'], 0, 1);

            expect(result).toBe(100);

        });
        it('will throw an error if labels is undefined', () => {
            const languageProcessor = new LanguageProcessor();
            const languageCode = 'fr';

            expect(() => {
                languageProcessor.addLanguage(languageCode, {} as any);
            }).toThrow();
        });

        it('will throw an error if labels is defined but empty', () => {
            const languageProcessor = new LanguageProcessor();
            const languageCode = 'fr';

            expect(() => {
                languageProcessor.addLanguage(languageCode, {
                    labels: {

                    }
                });
            }).toThrow();
        });
    });
});