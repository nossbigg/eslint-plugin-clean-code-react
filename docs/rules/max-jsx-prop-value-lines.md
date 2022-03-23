# max-jsx-prop-value-lines

JSX Element prop value does not exceed max lines.

## Rule Details

Verbose JSX prop values add unnecessary complexity to a JSX element definition. For long prop values (eg. expressions), it is preferable to refactor the long prop value into a separate variable.

This rule aims to...

Examples of **incorrect** code for this rule:

```js
// not ok, jsx prop value exceeds 1 line
<Row
  onClick={(value) => {
    const normalizedValue = trim(value);
    updateRow(normalizedValue);
  }}
/>
```

Examples of **correct** code for this rule:

```js
// ok
<Row onClick={onRowClick} />;

const onRowClick = (value) => {
  const normalizedValue = trim(value);
  updateRow(normalizedValue);
};
```

### Options

- `maxPropLines`: `number`, default: `1`
