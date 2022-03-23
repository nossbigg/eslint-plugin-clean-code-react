# no-component-prop-inline-typedef

React Component typedefs do not contain inline typedefs.

## Rule Details

Inline typedefs often make type definitions very large - It is preferable to refactor inline typedefs into their own separate type definitions.

Examples of **incorrect** code for this rule:

```js
const MyComponent: React.FC<{ name: string }> = () => <div />;

class MyComponent extends React.Component<{ name: string }> {}
class MyComponent extends React.PureComponent<{ name: string }> {}

// detects nested inline typedefs as well
const MyComponent: React.FC<SomeProps<{ name: string }>> = () => <div />;
```

Examples of **correct** code for this rule:

```js
const MyComponent: React.FC<TProps> = () => <div />;

class MyComponent extends React.Component<TProps> {}
class MyComponent extends React.PureComponent<TProps> {}
```
