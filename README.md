# @nossbigg/eslint-plugin-clean-code-react

ESLint rules to keep your React components squeaky clean ✨🧼

## Rules

_Note: All rule names are prefixed with_ `@nossbigg/clean-code-react/`:

- eg. To use `component-prop-typedef-name`, the full rule name is `@nossbigg/clean-code-react/component-prop-typedef-name`

`component`:

_Rules that apply to both Function and Class React Components_

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

_Rules that apply to JSX Elements_

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

_Rules that apply to Function React Component_

| Rule                                                               | Description                                                                   |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| [`max-fn-component-hooks`](./docs/rules/max-fn-component-hooks.md) | Ensures that React Function Component does not use more than max React Hooks. |

`class-component`:

_Rules that apply to Class React Component_

| Rule                                                                               | Description                                                |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [`no-unnecessary-class-component`](./docs/rules/no-unnecessary-class-component.md) | Ensures that unnecessary class components are not allowed. |

`hooks`:

_Rules that apply to React Hooks_

| Rule                                                                   | Description                                                     |
| ---------------------------------------------------------------------- | --------------------------------------------------------------- |
| [`max-hooks-in-custom-hook`](./docs/rules/max-hooks-in-custom-hook.md) | Ensures that custom React Hooks do not use more than max hooks. |

## Rule-level settings

This plugin allows for rule-level settings:

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

### Available settings:

1.`largeComponentLength`

Purpose: Determines the threshold for a large react component.

Used by:

- `no-external-fn-definition-in-large-component-file`
- `no-other-component-in-large-component-file`
- `no-styled-components-def-in-large-component-file`
- `no-typedefs-in-large-component-file`

Value: `number`, default: `50`

## Supported Syntax

### Supported Syntax:

```typescript
// Function Component using arrow function
const MyFunctionComponent: React.FunctionComponent = () => <></>;

// Function Component using function
const MyFunctionComponent: React.FunctionComponent = function() => <></>;

// Class Component
class MyClassComponent extends React.Component {
  render() {
    return <></>;
  }
}
```

Supported Function Component types:

- `FunctionComponent`
- `FC`
- `StatelessComponent`
- `SFC`
- `VoidFunctionComponent`
- `VFC`
- `React.FunctionComponent`
- `React.FC`
- `React.StatelessComponent`
- `React.SFC`
- `React.VoidFunctionComponent`
- `React.VFC`

Supported Class Component types:

- `Component`
- `PureComponent`
- `React.Component`
- `React.PureComponent`

### Unsupported Syntax:

```typescript
// function component defined using function without assignment
function MyFunctionComoponent() {
  return <></>;
}

// curried function component generator
const makeMyFunctionComponent = (): React.FunctionComponent => () => <></>;

// function without type definition
const MyFunctionComponent = () => <></>;

// function with JSX.ELement return type
const MyFunctionComponent = (): JSX.Element => <></>;

// function with React.ReactNode return type
const MyFunctionComponent = (): React.ReactNode => <></>;
```

### Tip: Ensuring all function components are declared using arrow function.

You can use [`eslint-plugin-react`](https://github.com/yannickcr/eslint-plugin-react)'s [`react/function-component-definition`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md) to ensure that all function components are declared using arrow functions.

```js
// .eslintrc.js
{
  "rules": {
    "react/function-component-definition": [
      "error",
      {
        "namedComponents": "arrow-function",
        "unnamedComponents": "arrow-function"
      }
    ]
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
    // without rule config
    "@nossbigg/clean-code-react/max-component-lines": "error",
    // with rule config
    "@nossbigg/clean-code-react/max-jsx-lines": ["error", { maxJsxLines: 31 }],
  }
}
```
