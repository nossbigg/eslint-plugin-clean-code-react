# @nossbigg/eslint-plugin-clean-code-react

ESLint rules to keep your React components squeaky clean ✨🧼

## Rules

_Note: All rule names are prefixed with_ `@nossbigg/clean-code-react/`:

- eg. To use `component-prop-typedef-name`, the full rule name is `@nossbigg/clean-code-react/component-prop-typedef-name`

`component`:

_Rules that apply to both Function and Class React Components_

| Rule                                                                                                                     | Description                                                                            |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| [`component-prop-typedef-name`](./docs/rules/component-prop-typedef-name.md)                                             | React Component typedef name contains 'Props'.                                         |
| [`max-component-lines`](./docs/rules/max-component-lines.md)                                                             | React Component declarations do not exceed max lines.                                  |
| [`max-component-nested-fn-lines`](./docs/rules/max-component-nested-fn-lines.md)                                         | Nested functions within React Component does not exceed max lines.                     |
| [`max-component-nested-fns`](./docs/rules/max-component-nested-fns.md)                                                   | React Component does not exceed max number of nested functions.                        |
| [`no-component-prop-inline-typedef`](./docs/rules/no-component-prop-inline-typedef.md)                                   | React Component typedefs do not contain inline typedefs.                               |
| [`no-external-fn-definition-in-large-component-file`](./docs/rules/no-external-fn-definition-in-large-component-file.md) | No external function definitions exist in the same file when a large component exists. |
| [`no-other-component-in-large-component-file`](./docs/rules/no-other-component-in-large-component-file.md)               | No other components exist in the same file when a large component exists.              |
| [`no-styled-components-def-in-large-component-file`](./docs/rules/no-styled-components-def-in-large-component-file.md)   | No styled components are declared in large component file.                             |
| [`no-typedefs-in-large-component-file`](./docs/rules/no-typedefs-in-large-component-file.md)                             | Typedefs are not declared in the same file when a large component exists.              |

`jsx`:

_Rules that apply to JSX Elements_

| Rule                                                                       | Description                                             |
| -------------------------------------------------------------------------- | ------------------------------------------------------- |
| [`max-jsx-expression-lines`](./docs/rules/max-jsx-expression-lines.md)     | JSX Expression blocks do not exceed max lines.          |
| [`max-jsx-lines`](./docs/rules/max-jsx-lines.md)                           | JSX Element blocks do not exceed max lines.             |
| [`max-jsx-prop-value-lines`](./docs/rules/max-jsx-prop-value-lines.md)     | JSX Element prop value does not exceed max lines.       |
| [`max-jsx-props`](./docs/rules/max-jsx-props.md)                           | JSX Element does not exceed max number of props.        |
| [`max-jsx-spread-props`](./docs/rules/max-jsx-spread-props.md)             | JSX Element does not exceed max number of spread props. |
| [`no-jsx-complex-spread-prop`](./docs/rules/no-jsx-complex-spread-prop.md) | JSX Element does not contain complex spread props.      |
| [`no-jsx-inline-style-prop`](./docs/rules/no-jsx-inline-style-prop.md)     | JSX Element does not contain inline style prop.         |

`fn-component`:

_Rules that apply to Function React Component_

| Rule                                                               | Description                                                      |
| ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [`max-fn-component-hooks`](./docs/rules/max-fn-component-hooks.md) | React Function Component does not use more than max React Hooks. |

`class-component`:

_Rules that apply to Class React Component_

| Rule                                                                               | Description                                   |
| ---------------------------------------------------------------------------------- | --------------------------------------------- |
| [`no-unnecessary-class-component`](./docs/rules/no-unnecessary-class-component.md) | Unnecessary class components are not allowed. |

`hooks`:

_Rules that apply to React Hooks_

| Rule                                                                   | Description                                        |
| ---------------------------------------------------------------------- | -------------------------------------------------- |
| [`max-hooks-in-custom-hook`](./docs/rules/max-hooks-in-custom-hook.md) | Custom React Hooks do not use more than max hooks. |

`typedefs`:

_Rules that apply to typedefs with 'Props'_
| Rule | Description |
| ---------------------------------------------------------------------- | -------------------------------------------------- |
| [`no-nested-type-literal-in-component-prop`](./docs/rules/max-hooks-in-custom-hook.md) | Component prop typedef does not contain nested typedef. |

## Rule-level settings

This plugin allows for rule-level settings:

```js
// .eslintrc.js
{
  "settings": {
    "@nossbigg/eslint-plugin-clean-code-react": {
      "jsCompatMode": false,
      "largeComponentLength": 50
    }
  }
}
```

### Available settings:

1. `jsCompatMode`

Purpose: Allows detection of React Function Component by name.

- Example Function Component names: `MyComponent`, `Table`
- Useful for non-TypeScript codebases, or codebases without a standardized type annotation convention.

Used by:

_All rules in the following categories:_

- `component`
- `fn-component`

Value: `boolean`, default: `false`

_Note_: May capture false positives (eg. `SomeUtilMethod()`).

2.`largeComponentLength`

Purpose: Determines the threshold for a large react component.

Used by:

- `no-external-fn-definition-in-large-component-file`
- `no-other-component-in-large-component-file`
- `no-styled-components-def-in-large-component-file`
- `no-typedefs-in-large-component-file`

Value: `number`, default: `50`

_Note_: When `largeComponentLength` is defined in multiple places, the precedence order is as follows:

- `rule config` > `plugin setting config` > `default value`

## Supported Syntax

### Supported Syntax:

```typescript
// Class Component
class MyClassComponent extends React.Component {
  render() {
    return <></>;
  }
}

// === With type definition ===

// Function Component using arrow function
const MyFunctionComponent: React.FunctionComponent = () => <></>;
// Function Component using function expression
const MyFunctionComponent: React.FunctionComponent = function() => <></>;

// === Without type definition ===
// note: requires jsCompatMode = true

// Function Component using arrow function
const MyFunctionComponent = () => <></>;
// Function Component using function expression
const MyFunctionComponent = function() => <></>;
// Function Component using function declaration
function MyFunctionComponent() => <></>;

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
// function component generator
const makeMyFunctionComponent = (): React.FunctionComponent => () => <></>;
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

2. Use plugin + rules

```js
// .eslintrc.js
{
  // use plugin + recommended rules
  "plugins": ["@nossbigg/clean-code-react"],
  "extends": ["plugin:@nossbigg/clean-code-react/recommended"],

  // define specific rules
  "rules": {
    // without rule config
    "@nossbigg/clean-code-react/max-component-lines": "error",
    // with rule config
    "@nossbigg/clean-code-react/max-jsx-lines": ["error", { "maxJsxLines": 31 }]
  }
}
```
