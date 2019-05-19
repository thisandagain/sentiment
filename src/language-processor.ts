import emojis from '../emoji/emoji.json';

// English is loaded by default
import { english } from '../languages/en';
import { Language } from './language';
import { join } from 'path';
import { ScoringStrategy } from './scoring-strategy';

type Languages = { [index: string]: Language };

// Merge English with Emojis
Object.assign(english.labels, emojis);

const defaultScoringStrategy: ScoringStrategy = {
    apply: function (_tokens, _cursor, tokenScore) {
        return tokenScore;
    }
};


/**
 * Dynamically loads a language from the languages directory.
 * This directory MUST include:
 *   - index.ts
 *   - labels.json
 *   - scoring-strategy.ts
 * 
 *  > Note: Remember that the .ts files will actually be .js at runtime.
 * @param {string} languageCode
 */
async function loadLanguage(languageCode: string): Promise<Language> {
    const languagePath = join(__dirname, '..', 'languages', languageCode, 'index');
    const language: Language = await import(languagePath);
    if (!language) {
        throw new Error('No language found: ' + languageCode);
    }
    if (!language.labels) {
        throw new Error(
            `Could not load labels for language: ${languageCode}.` +
            `Make sure ${join('languages', languageCode, 'labels.json')} exists.`
        );
    }
    if (!language.scoringStrategy) {
        console.warn(
            `Scoring strategy not found for language: ${languageCode}. ` +
            `Using default strategy instead.`
        );
        language.scoringStrategy = defaultScoringStrategy;
    }
    return language;
}


export class LanguageProcessor {
    private _languages: Languages;

    constructor() {

        this._languages = { en: english };
    }

    /**
     * Registers the specified language
     * @param {string} languageCode Two-digit code for the language to register
     * @param {Language} language The language module to register
     */
    addLanguage(languageCode: string, language: Language) {
        if (!language.labels) {
            throw new Error('language.labels must be defined!');
        }
        Object.assign(language.labels, emojis);
        this._languages[languageCode] = language;
    }

    /**
     * Retrieves a language object from the cache,
     * or tries to load it from the set of supported languages
     * @param {string | undefined} languageCode Two-digit code for the language to fetch
     * @returns
     * @memberof LanguageProcessor
     */
    async getLanguage(languageCode?: string): Promise<Language> {
        if (!languageCode) {
            // Default to english if no language was specified
            return this._languages.en;
        }
        if (this._languages[languageCode]) {
            return this._languages[languageCode];
        }
        const language = await loadLanguage(languageCode);
        // Add language to in-memory cache
        this.addLanguage(languageCode, language);
        return language;
    }

    /**
     * Returns AFINN-165 weighted labels for the specified language
     *
     * @param {string} languageCode Two-digit language code
     * @returns
     * @memberof LanguageProcessor
     */
    async getLabels(languageCode: string) {
        const language = await this.getLanguage(languageCode);
        if (!language) {
            throw new Error(`Could not get labels for language: ${languageCode}`);
        }
        return language.labels;
    }

    /**
     * Applies a scoring strategy for the current token
     *
     * @param {string} languageCode Two-digit language code
     * @param {string[]} tokens Tokens of the phrase to analyze
     * @param {number} cursor Cursor of the current token being analyzed
     * @param {number} tokenScore The score of the current token being analyzed
     * @returns
     * @memberof LanguageProcessor
     */
    async applyScoringStrategy(languageCode: string, tokens: string[], cursor: number, tokenScore: number) {
        const language = await this.getLanguage(languageCode);
        // Fallback to default strategy if none was specified
        // eslint-disable-next-line max-len
        const scoringStrategy = language.scoringStrategy || defaultScoringStrategy;
        return scoringStrategy.apply(tokens, cursor, tokenScore);
    }
}
