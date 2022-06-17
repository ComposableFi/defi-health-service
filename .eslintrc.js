/** @type {import('@types/eslint').Linter.Config} */
// module.exports = {
//   env: {
//     es6: true,
//     node: true,
//     browser: true, // Uncomment if your project involves frontend
//   },
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint'],
//   extends: ['eslint:recommended', 'next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
//   parserOptions: {
//     ecmaVersion: 'latest',
//   },
//   rules: {
//     'no-mixed-operators': 'off',
//     'no-multiple-empty-lines': 'off',
//     'no-unexpected-multiline': 'off',
//     '@typescript-eslint/ban-types': [
//       'warn',
//       {
//         types: {
//           String: {
//             message: 'Use string instead',
//             fixWith: 'string',
//           },

//           '{}': {
//             message: 'Use object instead',
//             fixWith: 'object',
//           },
//         },
//       },
//     ],
//   },
// };

module.exports = {
	extends: ["next/core-web-vitals"]
}
