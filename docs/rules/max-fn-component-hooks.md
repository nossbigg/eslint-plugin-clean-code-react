# max-fn-component-hooks

Ensures that React Function Component does not use more than max React Hooks.

## Rule Details

React Function Components that use many hooks are often difficult to reason.

This rule ensures that Function Components do not use too many React Hooks.

Examples of **incorrect** code for this rule:

```js
// uses >5 hooks
const MyComponent: React.FunctionComponent = () => {
  useMyHook1();
  useMyHook2();
  useMyHook3();
  useMyHook4();
  useMyHook5();
  useMyHook6();
  return <div />;
};
```

Examples of **correct** code for this rule:

```js
// uses 5 or less hooks
const MyComponent: React.FunctionComponent = () => {
  useMyHook1();
  useMyHook2();
  useMyHook3();
  useMyHook4();
  useMyHook5();
  return <div />;
};
```
