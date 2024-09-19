module.exports = {
    extends: [
        "../../.eslintrc.js",
        "plugin:react-hooks/recommended"
    ],
    plugins: [
        "react-hooks",
        "react-refresh"
    ],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
    }
};