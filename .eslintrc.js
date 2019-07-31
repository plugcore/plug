module.exports = {
	env: {
		commonjs: true,
		node: true,
		es6: true
	},
	parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parserOptions: {
		ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
		sourceType: 'module',  // Allows for the use of imports
		ecmaFeatures: {
			jsx: true,  // Allows for the parsing of JSX
		},
	},
	rules: {
		['no-useless-escape']: 0,
		['@typescript-eslint/indent']: [
			'error',
			'tab',
			{
				'flatTernaryExpressions': true,
				'SwitchCase': 1
			},
		],
		['quotes']: [
			'error',
			'single'
		],
		['@typescript-eslint/semi']: [
			'error',
			'always'
		],
		['@typescript-eslint/no-explicit-any']: 0,
		['@typescript-eslint/explicit-function-return-type']: 0,
		['@typescript-eslint/no-angle-bracket-type-assertion']: 0,
		['@typescript-eslint/no-object-literal-type-assertion']: 0,
		['@typescript-eslint/interface-name-prefix']: 0,
		['@typescript-eslint/no-var-requires']: 0,
		['@typescript-eslint/no-parameter-properties']: 0,
		['@typescript-eslint/explicit-member-accessibility']: 0,
		['@typescript-eslint/no-use-before-define']: 0,
		['@typescript-eslint/no-empty-interface']: 0
	}
};
