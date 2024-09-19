// const globals = require('globals').browser;
// const reactHooks = require('eslint-plugin-react-hooks');
// const reactRefresh = require('eslint-plugin-react-refresh');

// module.exports = {
//     ignores: [
//         'dist'
//     ],
//     extends: [
//         "../../.eslintrc.js",
//     ],
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//         ecmaVersion: 2020,
//         globals: globals,
//     },
//     plugins: {
//         'react-hooks': reactHooks,
//         'react-refresh': reactRefresh,
//     },
//     rules: {
//         ...reactHooks.configs.recommended.rules,
//         'react-refresh/only-export-components': [
//             'warn',
//             { allowConstantExport: true },
//         ]
//     }
// };

module.exports = {
    extends: [
        "../../.eslintrc.js",
    ]
};