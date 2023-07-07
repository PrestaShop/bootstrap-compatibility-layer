/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import $ from 'jquery';
import bootstrap from 'bootstrap';

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  reporters: ['default'],
  coverageDirectory: 'tests/coverage',
  transform: {
    '^.+\\.scss$': 'jest-scss-transform'
  },
  globals: {
    $: undefined
  }
};
