# no-external-fn-definition-in-large-component-file

Ensures that no external function definitions exist in the same file when a large component exists.

## Rule Details

External function definitions in the same file as a large component often bloats up files - It is preferable to refactor external functions to a separate file.

Examples of **incorrect** code for this rule:

```js
// large component, >50 lines
const MyLargeComponent: React.FC = () => {
  // another 50 lines
  return <div>Some</div>;
};

// lint error on this line
const doSomeHelperFunction = () => { ... }
```

Examples of **correct** code for this rule:

```js
// large component, >50 lines
const MyLargeComponent: React.FC = () => {
  // another 50 lines
  return <div>Some</div>;
};
```

### Options

- `largeComponentLength`: `number`, default: `50`
