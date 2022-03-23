# max-component-nested-fns

React Component does not exceed max number of nested functions.

## Rule Details

Components with too many nested functions are hard to test and difficult to reason.

Examples of **incorrect** code for this rule:

```js
// function component, >5 nested functions
const MyFnComponent: React.FC = () => {
  const onClick1 = () => {};
  const onClick2 = function () {};
  function onClick3() {}

  const onClick5 = () => {
    const onClick6 = () => {};
  };

  return <div />;
};

// class component, >5 nested functions
// excludes render() and constructor() definition by default
class MyClassComponent extends React.Component {
  constructor() {}
  render() {
    return <div />;
  }

  onClick1() {}
  onClick2 = () => {};
  onClick3() {}

  onClick5() {
    const onClick6 = () => {};
  }
}
```

Examples of **correct** code for this rule:

```js
// function component, 5 or less nested functions
const MyFnComponent: React.FC = () => {
  const onClick1 = () => {};
  const onClick2 = function () {};
  function onClick3() {}

  return <div />;
};

// class component, 5 or less nested functions
// excludes render() and constructor() definition by default
class MyClassComponent extends React.Component {
  constructor() {}
  render() {
    return <div />;
  }

  onClick1() {}
  onClick2 = () => {};
  onClick3() {}
}
```

### Options

- `maxFns`: `number`, default: `10`
- `excludedClassMethods`: `number`, default: `['render', 'constructor']`
