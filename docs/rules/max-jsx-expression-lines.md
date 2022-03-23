# max-jsx-expression-lines

JSX Expression blocks do not exceed max lines.

## Rule Details

Large `JSXExpression` blocks often result in unreadable code.

Examples of **incorrect** code for this rule:

```js
// JSX expression exceeds 3 lines
const MyComponent = () => (
  <div>
    {show &&
      "Some Long Long Long Long Long Long Text" +
        "Some Long Long Long Long Long Long Text" +
        "Some Long Long Long Long Long Long Text"}
  </div>
);
```

Examples of **correct** code for this rule:

```js
// truthy check
const MyComponent = () => <div>{show && "Some Text"}</div>;

// ternary operator
const MyComponent = () => (
  <div>
    {show
      ? "Some Long Long Long Long Long Long Text"
      : "Some Other Long Long Long Long Text"}
  </div>
);

// expression with comments only
const MyComponent = () => (
  <div>
    {
      // comment 1
      // comment 2
      // comment 3
      // comment 4
    }
  </div>
);
```

### Options

- `maxLines`: `number`, default: `3`

## Further Reading

- [TypeScript: Documentation - JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)
