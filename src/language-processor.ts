import emojis from '../emoji/emoji.json';

// English is loaded by default
import { english } from '../languages/en';
import { Language } from '../languages/language';
import { join } from 'path';
import { ScoringStrategy } from './scoring-strategy';

type Languages = { [index: string]: Language };

export interface LanguageInput extends Partial<Language> {
    labels: { [index: string]: number; };
    scoringStrategy?: ScoringStrategy;
}

// Merge English with Emojis
Object.assign(english.labels, emojis);

const defaultScoringStrategy: ScoringStrategy = (_tokens, _cursor, tokenScore) => tokenScore;


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
function loadLanguage(languageCode: string): Language {
    const languagePath = join(__dirname, '..', 'languages', languageCode);
    const language: Language = require(languagePath).default;
    console.warn(Object.keys(language));
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
    private readonly _languages: Languages;

    constructor() {
        this._languages = { en: english };
    }

    /**
     * Registers the specified language
     * @param {string} languageCode Two-digit code for the language to register
     * @param {Language} language The language module to register
     */
    addLanguage(languageCode: string, language: LanguageInput): void {
        if (!language.labels) {
            throw new Error('language.labels must be defined.');
        }
        if (Object.keys(language.labels).length === 0) {
            throw new Error('language.labels must contain fields.');
        }
        Object.assign(language.labels, emojis);

        if(language.scoringStrategy) {
            this._languages[languageCode] = { 
                labels: language.labels,
                scoringStrategy: language.scoringStrategy
            };
        } else {
            this._languages[languageCode] = { 
                labels: language.labels,
                scoringStrategy: defaultScoringStrategy
            };
        }

    }

    /**
     * Retrieves a language object from the cache,
     * or tries to load it from the set of supported languages
     * @param {string | undefined} languageCode Two-digit code for the language to fetch
     * @returns {Promise<Language>} The language associated with the given language code
     * @memberof LanguageProcessor
     */
    getLanguage(languageCode?: string): Language {
        // Default to english if no language was specified
        if (!languageCode) {
            return this._languages.en;
        }
        // Try loading from the cache
        if (this._languages[languageCode]) {
            return this._languages[languageCode];
        }
        // Try loading language from one of the language roots in the languages directory
        const language = loadLanguage(languageCode);
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
    getLabels(languageCode: string): { [index: string]: number } {
        const language = this.getLanguage(languageCode);
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
    applyScoringStrategy(languageCode: string, tokens: string[], cursor: number, tokenScore: number) {
        const language = this.getLanguage(languageCode);
        // Fallback to default strategy if none was specified
        // eslint-disable-next-line max-len
        const scoringStrategy = language.scoringStrategy || defaultScoringStrategy;
        return scoringStrategy(tokens, cursor, tokenScore);
    }
}
