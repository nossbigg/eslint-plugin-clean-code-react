# no-other-component-in-large-component-file

"Ensures that no other components exist in the same file when a large component exists.

## Rule Details

For a file that has a large component, it is preferable that the file does not have any other components, in order to promote code discoverability.

Examples of **incorrect** code for this rule:

```js
// large component, >50 lines
const MyLargeComponent: React.FC = () => {
  // another 50 lines
  return <div>Some</div>;
};

// lint error on this line, since there is already a large component
const MySmallComponent: React.FC = () => <div />;
```

Examples of **correct** code for this rule:

```js
// 2 small components, ok
const MySmallComponent1: React.FC = () => <div />;

const MySmallComponent2: React.FC = () => <div />;
```

### Options

- `largeComponentLength`: `number`, default: `50`
