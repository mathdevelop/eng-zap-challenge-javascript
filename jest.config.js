module.exports = {
    moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)(\\?inline)?$': '<rootDir>/__mocks__/fileMock.js'
    },
    preset: '@vue/cli-plugin-unit-jest',
    setupFiles: ['./src/setupTests.js']
}
