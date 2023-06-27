/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  reporters: ['default'],
  coverageDirectory: 'tests/coverage',
  transform: {
    '^.+\\.scss$': 'jest-scss-transform'
  }
};
