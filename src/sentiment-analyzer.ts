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
     * Score calculated by adding the sentiment values of recongnized words
     *
     * @type {number}
     * @memberof AnalyzeResult
     */
    score: number;
    /**
     * Comparative score of the input string
     *
     * @type {number}
     * @memberof AnalyzeResult
     */
    comparative: number;
    /**
     * All the tokens like words or emojis found in the input string
     *
     * @type {string[]}
     * @memberof AnalyzeResult
     */
    tokens: string[];
    /**
     * List of words from input string that were found in AFINN list
     *
     * @type {string[]}
     * @memberof AnalyzeResult
     */
    words: string[];
    /**
     * List of postive words in input string that were found in AFINN list
     *
     * @type {string[]}
     * @memberof AnalyzeResult
     */
    positive: string[];
    /**
     * List of negative words in input string that were found in AFINN list
     *
     * @type {string[]}
     * @memberof AnalyzeResult
     */
    negative: string[];
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

/**
 * Creates an instance of Sentiment; a tool for AFINN Sentiment analysis.
 * Comes prepacked with English language defaults, and has the ability to be extended
 * with new languages.
 * 
 * @export
 * @class Sentiment
 */
export class Sentiment {
    private readonly _languageProcessor: LanguageProcessor;

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
        let score: number = 0;
        const words: string[] = [];
        const positive: string[] = [];
        const negative: string[] = [];

        // Iterate over tokens
        let i = tokens.length;
        while (i--) {
            const token = tokens[i];
            if (!labels.hasOwnProperty(token)) {
                continue;
            }
            words.push(token);

            // Apply scoring strategy
            const tokenScore = await this._languageProcessor
                .applyScoringStrategy(languageCode, tokens, i, labels[token]);

            if (tokenScore > 0)
                positive.push(token);
            if (tokenScore < 0)
                negative.push(token);
            score += tokenScore;
        }

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

