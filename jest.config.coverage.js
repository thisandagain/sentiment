module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    roots: [
        '<rootDir>/test/unit',
        '<rootDir>/test/integration'
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
