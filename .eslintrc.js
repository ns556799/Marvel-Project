module.exports = {
  root: true,
  "parser": "babel-eslint",
  "extends": [
    "standard",
    "standard-react"
  ],
  "env": {
    "es6": true,
    "jest": true
  },
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": true
  },
  "rules": {
    "no-case-declarations" : 1,
    "react/jsx-no-bind": [1, {}],
    "space-before-function-paren": 0,
    "react/jsx-boolean-value": 0,
    "import/first": 0,
    "react/prop-types": 0
  }
}
