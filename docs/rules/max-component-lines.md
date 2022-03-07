# max-component-lines

Ensures that React Component declarations do not exceed max lines.

## Rule Details

Large components are unmaintainable.

Examples of **incorrect** code for this rule:

```js
// function component with >100 lines
const MyFnComponent: React.FC<T> = () => {
  //...100 lines of code
  return <div />;
};

// class component with >100 lines
class MyClassComponent extends React.Component {
  render() {
    //...100 lines of code
    return <div />;
  }
}
```

Examples of **correct** code for this rule:

```js
// function component with 100 lines or less
const MyFnComponent: React.FC<T> = () => {
  return <div />;
};

// class component with 100 lines or less
class MyClassComponent extends React.Component {
  render() {
    return <div />;
  }
}
```

### Options

- `maxLines`: `number`, default: `100`
