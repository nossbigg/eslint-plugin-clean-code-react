# no-jsx-inline-style-prop

Ensures that JSX Element does not contain inline style prop.

## Rule Details

Inline style props adds clutter to a JSX Element definition - It is preferable to extract the style values to a separate variable.

Examples of **incorrect** code for this rule:

```js
// not ok, style value is declared inline
<div style={{ backgroundColor: "red" }} />
```

Examples of **correct** code for this rule:

```js
// ok
const divStyle = { backgroundColor: "red" };
<div style={divStyle} />;
```
