# max-jsx-props

Ensures that `JSXElement` does not exceed max number of props.

## Rule Details

`JSXElement` with many props is an indication that the component is doing too much.

Examples of **incorrect** code for this rule:

```js
// >5 props
const MyComponent: React.FC = () => (
  <AnotherComponent
    firstName={firstName}
    lastName={lastName}
    user={user}
    isAdmin
    isViewOnly
    {...otherExtraProps}
  />
);
```

Examples of **correct** code for this rule:

```js
// 5 props or less
const MyComponent: React.FC = () => (
  <AnotherComponent
    firstName={firstName}
    lastName={lastName}
    user={user}
    isAdmin
    isViewOnly
  />
);
```

### Options

- `maxProps`: `number`, default: `5`
- `excludedComponents`: `string[]`, default: `[]`, useful for excluding 3rd-party library components

eg:

```typescript
// with maxProps = 5, excludedComponents = ['UITable']
<UITable
  data={data}
  headerConfig={headerConfig}
  border={borderConfig}
  isResponsive
  isMultiTabView
  hideBottomBar
/>
```

## Further Reading

- [TypeScript: Documentation - JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)
