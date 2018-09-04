module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  setupFiles: ['raf/polyfill', '<rootDir>/test/setupTests.js']
}
