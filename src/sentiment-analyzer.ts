import { tokenize } from './tokenize';
import { LanguageProcessor } from './language-processor';
import { Language } from './language';

/**
 * The final result of the analysis.
 *
 * @interface AnalyzeResult
 */
interface AnalyzeResult {
    /**
     * 
     *
     * @type {number}
     * @memberof AnalyzeResult
     */
    score: number,
    comparative: number,
    tokens: string[],
    words: string[],
    positive: string[],
    negative: string[]
}

/**
 * Options for the Sentiment Analyzer.
 *
 * @interface AnalyzeOptions
 */
interface AnalyzeOptions {
    /**
     * An optional object with strings mapped to their sentiment value.
     * Optional sentiment additions to AFINN (hash k/v pairs)
     * @type {{
     *         [word: string]: number;
     *     } | undefined}
     * @memberof AnalyzeOptions
     */
    extras?: {
        [word: string]: number;
    };
    /**
     * An optional 2 letter language code to select one of the languages stored in the languages folder.
     * If not used, the language will be set to English.
     * @type {string | undefined}
     * @memberof AnalyzeOptions
     */
    languageCode?: string;
}

export class Sentiment {
    private _languageProcessor: LanguageProcessor;

    /**
     * Creates an instance of Sentiment.
     * @memberof Sentiment
     */
    constructor() {
        this._languageProcessor = new LanguageProcessor();
    }

    /**
     * Registers the specified language
     * @param {string} languageCode Two-digit code for the language to register
     * @param {Language} language The language module to register
     */
    registerLanguage(languageCode: string, language: Language) {
        this._languageProcessor.addLanguage(languageCode, language);
    }

    analyze(phrase: string): Promise<AnalyzeResult>;
    analyze(phrase: string, opts: AnalyzeOptions): Promise<AnalyzeResult>;

    /**
     * Performs sentiment analysis on the provided input 'phrase'.
     *
     * @param {string} phrase Input phrase
     * @param {AnalyzeOptions} analyzeOptions Options such as the language code or extra AFINN pairs
     * @memberof Sentiment
     */
    async analyze(phrase: string, analyzeOptions?: AnalyzeOptions): Promise<AnalyzeResult> {
        let opts: AnalyzeOptions = {};
        if (analyzeOptions) {
            if (analyzeOptions.extras || analyzeOptions.languageCode) {
                opts = analyzeOptions || {};
            }
            else {
                throw new Error(
                    `Invalid options given for analyze.\n` +
                    `Options given: ${Object.keys(analyzeOptions)}.\n` +
                    `Expected any of: extras, languageCode.\n` +
                    `Example: analyze('foo bar baz', { extras: { baz: 2 }, languageCode: 'en' })`
                );
            }
        }

        const languageCode = opts.languageCode || 'en';
        const labels = await this._languageProcessor.getLabels(languageCode);

        // Merge extra labels
        if (typeof opts.extras === 'object') {
            Object.assign(labels, opts.extras);
        }

        const tokens = tokenize(phrase);
        let   score:    number   = 0;
        const words:    string[] = [];
        const positive: string[] = [];
        const negative: string[] = [];

        // Iterate over tokens
        // let i = tokens.length;

        await Promise.all(tokens.map(async (token, i) => {
            if (!labels.hasOwnProperty(token))
                return;

            words.push(token);
            const tokenScore = labels[token];
            if (tokenScore > 0)
                positive.push(token)
            if (tokenScore < 0)
                negative.push(token);

            score += await this._languageProcessor
                .applyScoringStrategy(languageCode, tokens, i, tokenScore);
        }));
        // while (i--) {
        //     const token = tokens[i];
        //     if (!labels.hasOwnProperty(token)) {
        //         continue;
        //     }

        //     words.push(token);

        //     // Apply scoring strategy
        //     let tokenScore = labels[token];
        //     // eslint-disable-next-line max-len
        //     tokenScore = await this._languageProcessor.applyScoringStrategy(languageCode, tokens, i, tokenScore);
        //     if (tokenScore > 0) positive.push(token);
        //     if (tokenScore < 0) negative.push(token);
        //     score += tokenScore;
        // }

        const result: AnalyzeResult = {
            score,
            comparative: tokens.length > 0 ? score / tokens.length : 0,
            tokens,
            words,
            positive,
            negative
        };

        return result;
    }
}



// /**
//  * 
//  *
//  * @param {String} phrase
//  *     - Input phrase
//  * @param {Object} opts
//  *     - Options
//  * @param {Object} opts.language
//  *     - Input language code (2 digit code), defaults to 'en'
//  * @param {Object} opts.extras
//  *     - Optional sentiment additions to AFINN (hash k/v pairs)
//  * @param {function} callback
//  *     - Optional callback
//  * @return {Object}
//  */
// Sentiment.prototype.analyze = function (phrase, opts, callback) {

// };
