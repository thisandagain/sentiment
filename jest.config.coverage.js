module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    roots: [
        '<rootDir>/languages',
        '<rootDir>/src',
        '<rootDir>/test/unit',
        '<rootDir>/test/integration'
    ],
    testRegex: '(.*|(\\.|/)(test|spec))\\.ts$',
    testPathIgnorePatterns: [
        '/lib/',
        '/node_modules/',
        '/src',
        '/languages'
    ],
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node'
    ],
    collectCoverage: true,
};
