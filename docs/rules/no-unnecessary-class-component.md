# no-unnecessary-class-component

Ensures that unnecessary class components are not allowed.

## Rule Details

Class components that do not use any Error Handling-related functionality should be converted to function components.

Examples of **incorrect** code for this rule:

```js
class MyComponent1 extends React.Component {
  render() {}
}
```

Examples of **correct** code for this rule:

```js
class MyComponent1 extends React.Component {
  static getDerivedStateFromError() {}
  render() {}
}

class MyComponent2 extends React.Component {
  componentDidCatch() {}
  render() {}
}
```

## Further Reading

- [React.Component - React | Error Handling](https://reactjs.org/docs/react-component.html#error-handling)
