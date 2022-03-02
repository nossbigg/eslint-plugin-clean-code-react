# max-jsx-lines

Ensures that `JSXElement` blocks do not exceed max lines.

## Rule Details

Large `JSXElement` blocks often result in unreadable code.

Examples of **incorrect** code for this rule:

```js
// not ok, component definition only spans >20 lines
const MyComponent: React.FC<T> = () => <div>
{//...20 lines of code}
</div>
```

Examples of **correct** code for this rule:

```js
// ok, component definition only spans 1 line
const MyComponent: React.FC<T> = () => <div></div>;
```

### Options

- `maxLines`: `number`, default: `20`

## Further Reading

- [TypeScript: Documentation - JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)
