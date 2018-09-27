module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:vue/essential'
    ],
    rules: {
        quotes: [2, 'single', { avoidEscape: true }],
        semi: [2, 'always']
    }
}