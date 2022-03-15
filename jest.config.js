module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: ['/node_modules/(?!native-base)/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/docs/'],
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverage: true,
};
