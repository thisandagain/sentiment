/*eslint no-useless-escape: "off"*/

/**
 * Remove special characters and return an array of tokens (words).
 * @param  {string} input Input string
 * @return {array}        Array of tokens
 */
export function tokenize(input: string): Array<string> {
    // Check type for js users and give a more meaningful message than:
    // "Uncaught TypeError: input.toLowerCase is not a function"
    if(typeof input !== 'string') {
        throw new Error(`Cannot tokenize non-string values.\nValue received: ${input}`);
    }
    return input
        .toLowerCase()
        .replace(/\n/g, ' ')
        .replace(/[.,\/#!$%\^&\*;:{}=_`\"~()]/g, '')
        .split(' ')
        .filter(s => s.length > 0);
};
