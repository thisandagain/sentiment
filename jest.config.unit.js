module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    roots: [
        '<rootDir>/test'
    ],
    testRegex: '(.*|(\\.|/)(test|spec))\\.ts$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node'
    ],
};
