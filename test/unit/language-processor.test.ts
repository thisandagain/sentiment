import { LanguageProcessor } from '../../src/language-processor';
import englishLabels from '../../languages/en/labels.json';
import emojis from '../../emoji/emoji.json';
import { Language } from '../../languages/language';

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
                const lang: Language = {
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