module.exports = {
  clearMocks: true,
  testMatch: ['**/*.spec.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
};
