# no-styled-components-def-in-large-component-file

Ensures that no styled component definitions exist in the same file when a large component exists.

## Rule Details

Styled component definitions in the same file as a large component often bloats up files - It is preferable to refactor styled components to a separate file.

Examples of **incorrect** code for this rule:

```js
// large component, >50 lines
const MyLargeComponent: React.FC = () => {
  // another 50 lines
  return <div>Some</div>;
};

// lint error on these line
const StyledDiv = styled.div``;
const StyledMyComponent = styled(MyLargeComponent)``;
```

Examples of **correct** code for this rule:

```js
// large component, >50 lines
const MyLargeComponent: React.FC = () => {
  // another 50 lines
  return <div>Some</div>;
};

// styled components refactored to a separate file
```

### Options

- `largeComponentLength`: `number`, default: `50`
