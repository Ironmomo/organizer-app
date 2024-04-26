/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/__tests__/**/*.m[jt]s?(x)",
    "**/?(*.)+(spec|test).m[tj]s?(x)"
  ]
};