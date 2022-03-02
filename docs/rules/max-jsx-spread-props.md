# max-jsx-spread-props

Ensures that `JSXElement` does not exceed max number of spread props.

## Rule Details

`JSXElement` with many spread props is a source of a lot of entropy.

Examples of **incorrect** code for this rule:

```js
// >2 spread props
const MyComponent: React.FC = () => (
  <AnotherComponent {...otherProps1} {...otherProps2} {...otherProps3} />
);
```

Examples of **correct** code for this rule:

```js
// 2 spread props or less
const MyComponent: React.FC = () => (
  <AnotherComponent {...otherProps1} {...otherProps2} />
);
```

### Options

- `maxSpreadProps`: `number`, default: `2`
- `excludedComponents`: `string[]`, default: `[]`, useful for excluding 3rd-party library components

eg:

```typescript
// with maxSpreadProps = 2, excludedComponents = ['UITable']
<UITable {...userProps} {...groupProps} {...orgProps} />
```

## Further Reading

- [TypeScript: Documentation - JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)
