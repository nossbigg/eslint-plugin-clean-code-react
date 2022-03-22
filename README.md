# @nossbigg/eslint-plugin-clean-code-react

ESLint rules to keep your React components squeaky clean ✨🧼

## Rules

`component`:

| Rule                                                                                                                     | Description                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| [`component-prop-typedef-name`](./docs/rules/component-prop-typedef-name.md)                                             | Ensures React Component typedef name contains 'Props'.                                              |
| [`max-component-lines`](./docs/rules/max-component-lines.md)                                                             | Ensures that React Component declarations do not exceed max lines.                                  |
| [`max-component-nested-fn-lines`](./docs/rules/max-component-nested-fn-lines.md)                                         | Ensures nested functions within React component does not exceed max lines.                          |
| [`max-component-nested-fns`](./docs/rules/max-component-nested-fns.md)                                                   | Ensures component does not exceed max number of nested functions.                                   |
| [`no-component-prop-inline-typedef`](./docs/rules/no-component-prop-inline-typedef.md)                                   | Ensures that React Component typedefs do not contain inline typedefs.                               |
| [`no-external-fn-definition-in-large-component-file`](./docs/rules/no-external-fn-definition-in-large-component-file.md) | Ensures that no external function definitions exist in the same file when a large component exists. |
| [`no-other-component-in-large-component-file`](./docs/rules/no-other-component-in-large-component-file.md)               | Ensures that no other components exist in the same file when a large component exists.              |
| [`no-styled-components-def-in-large-component-file`](./docs/rules/no-styled-components-def-in-large-component-file.md)   | Ensures that no styled components are declared in large component file.                             |
| [`no-typedefs-in-large-component-file`](./docs/rules/no-typedefs-in-large-component-file.md)                             | Ensures that typedefs are not declared in the same file when a large component exists.              |

`jsx`:

| Rule                                                                       | Description                                                           |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [`max-jsx-expression-lines`](./docs/rules/max-jsx-expression-lines.md)     | Ensures that JSXExpression blocks do not exceed max lines.            |
| [`max-jsx-lines`](./docs/rules/max-jsx-lines.md)                           | Ensures that JSXElement blocks do not exceed max lines.               |
| [`max-jsx-prop-value-lines`](./docs/rules/max-jsx-prop-value-lines.md)     | Ensures that JSX prop value does not exceed max lines.                |
| [`max-jsx-props`](./docs/rules/max-jsx-props.md)                           | Ensures that `JSXElement` does not exceed max number of props.        |
| [`max-jsx-spread-props`](./docs/rules/max-jsx-spread-props.md)             | Ensures that `JSXElement` does not exceed max number of spread props. |
| [`no-jsx-complex-spread-prop`](./docs/rules/no-jsx-complex-spread-prop.md) | Ensures that `JSXElement` does not contain complex spread props.      |
| [`no-jsx-inline-style-prop`](./docs/rules/no-jsx-inline-style-prop.md)     | Ensures that JSX Element does not contain inline style prop.          |

`fn-component`:

| Rule                                                               | Description                                                                   |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| [`max-fn-component-hooks`](./docs/rules/max-fn-component-hooks.md) | Ensures that React Function Component does not use more than max React Hooks. |

`class-component`:

| Rule                                                                               | Description                                                |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [`no-unnecessary-class-component`](./docs/rules/no-unnecessary-class-component.md) | Ensures that unnecessary class components are not allowed. |

`hooks`:

| Rule                                                                   | Description                                                     |
| ---------------------------------------------------------------------- | --------------------------------------------------------------- |
| [`max-hooks-in-custom-hook`](./docs/rules/max-hooks-in-custom-hook.md) | Ensures that custom React Hooks do not use more than max hooks. |

## Rule-level settings

<TBC>

```js
// .eslintrc.js
{
  "settings": {
    "@nossbigg/eslint-plugin-clean-code-react": {
      "largeComponentLength": 50
    }
  }
}
```

## Installation

Prerequisites:

- `eslint` ([see more](https://eslint.org/))
- `TypeScript` ([see more](https://www.typescriptlang.org/))
- `@typescript-eslint/parser` ([see more](https://github.com/typescript-eslint/typescript-eslint))

Steps:

1. Add lib as dev dependency

```sh
yarn add -D @nossbigg/eslint-plugin-clean-code-react
```

2. Use plugin

```js
// .eslintrc.js
{
  "plugins": ["@nossbigg/eslint-plugin-clean-code-react"]
}
```

3. Use rules

```js
// .eslintrc.js
{
  "rules": {
    "@nossbigg/clean-code-react/max-jsx-lines": 2
  }
}
```
