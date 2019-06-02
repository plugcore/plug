module.exports = {
	parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
	extends: [
		'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
	],
	parserOptions: {
		ecmaVersion: 2018,  // Support for ECMAScript 2018
		sourceType: 'module',  // Allows for the use of imports
	},
	rules: {
		['@typescript-eslint/indent']: [
			'error',
			'tab'
		],
		['quotes']: [
			'error',
			'single'
		],
		['@typescript-eslint/semi']: [
			'error',
			'always'
		],
		['@typescript-eslint/no-explicit-any']: false,
		['@typescript-eslint/explicit-function-return-type']: false,
		['@typescript-eslint/no-angle-bracket-type-assertion']: false,
		['@typescript-eslint/no-object-literal-type-assertion']: false,
		['@typescript-eslint/interface-name-prefix']: 'always',
		['@typescript-eslint/no-var-requires']: false,
		['@typescript-eslint/no-parameter-properties']: { 'allows': ['private'], },
		['@typescript-eslint/explicit-member-accessibility']: false,
		['@typescript-eslint/no-use-before-define']: false
	}
};
