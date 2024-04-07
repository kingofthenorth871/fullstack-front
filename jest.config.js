module.exports = {
  preset: 'react-app',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // Transform .js, .jsx, .ts, and .tsx files using babel-jest
  },
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};