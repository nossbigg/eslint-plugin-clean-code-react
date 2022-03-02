# no-jsx-complex-spread-prop

Ensures that `JSXElement` does not contain complex spread props.

## Rule Details

`JSXElement` spread props that use complex expressions severely hurts code readability.

Examples of **incorrect** code for this rule:

```js
const MyComponent: React.FC = () => (
  <AnotherComponent {...(isAdmin ? adminProps : {})} />
);
```

Examples of **correct** code for this rule:

```js
const computedProps = isAdmin ? adminProps : {};

const MyComponent: React.FC = () => <AnotherComponent {...computedProps} />;
```

## Further Reading

- [TypeScript: Documentation - JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)
