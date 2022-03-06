# no-typedefs-in-large-component-file

Ensures that typedefs are not declared in the same file when a large component exists.

## Rule Details

Extraneous typedefs declared in the same file as a large component often bloats the file up, making it less readable - It is preferable to refactor these typedefs to a separate file.

Examples of **incorrect** code for this rule:

```js
// large component, >50 lines
const MyLargeComponent: React.FC = () => {
  // another 50 lines
  return <div>Some</div>;
};

// lint error on this line, since there is a large component
type SomeOtherType = {};
```

Examples of **correct** code for this rule:

```js
// case 1: large component with no extraneous typedefs
const MyLargeComponent: React.FC = () => {
  // another 50 lines
  return <div>Some</div>;
};

// case 2: file without large component
type SomeOtherTypeOne = {};
type SomeOtherTypeTwo = {};

// case 3: large component with props typedefs
type MyLargeComponentProps = {};

const MyLargeComponent: React.FC<MyLargeComponentProps> = () => {
  // another 50 lines
  return <div>Some</div>;
};
```

### Options

- `largeComponentLength`: `number`, default: `50`
- `excludePropsTypedefs`: `boolean`, default: `true`
  - Set to `false` if you want to disallow all typedefs, even typedefs that include 'Props'.
