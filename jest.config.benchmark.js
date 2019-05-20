module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    roots: [
        '<rootDir>/test/benchmark'
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
