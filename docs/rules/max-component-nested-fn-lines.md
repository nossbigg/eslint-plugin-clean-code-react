# max-component-nested-fn-lines

Ensures nested functions within React component does not exceed max lines.

## Rule Details

Long nested functions clutter a component's definition - It is preferable to refactor long nested functions to a separate file.

Examples of **incorrect** code for this rule:

```js
// function component, nested function with >5 lines
const MyFnComponent: React.FC = () => {
  const onClick = () => {
    // line 1
    // line 2
    // line 3
    // line 4
    // line 5
  };

  return <div />;
};

// class component, nested function with >5 lines
// excludes render() and constructor() definition by default
class MyClassComponent extends React.Component {
  constructor() {}
  render() {
    return <div />;
  }

  onClick() {
    // line 1
    // line 2
    // line 3
    // line 4
    // line 5
  }
}
```

Examples of **correct** code for this rule:

```js
// function component, nested function with 5 or less lines
const MyFnComponent: React.FC = () => {
  const onClick = () => {
    // line 1
    // line 2
    // line 3
  };

  return <div />;
};

// class component, nested function with 5 or less lines
// excludes render() and constructor() definition by default
class MyClassComponent extends React.Component {
  constructor() {}
  render() {
    return <div />;
  }

  onClick() {
    // line 1
    // line 2
    // line 3
  }
}
```

### Options

- `maxFnLines`: `number`, default: `5`
- `excludedClassMethods`: `number`, default: `['render', 'constructor']`
