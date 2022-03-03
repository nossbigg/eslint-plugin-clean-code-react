# component-prop-typedef-name

Ensures React Component typedef name contains 'Props'.

## Rule Details

Enforcing 'Props' for types that are used with React Components helps to promote code discoverability.

Examples of **incorrect** code for this rule:

```js
// function component
const MyComponent: React.FC<MyComponentType> = () => <div />;

// class component
class MyComponent extends React.Component<TProp, TState> {}
class MyComponent extends React.PureComponent<TProp, TState> {}
```

Examples of **correct** code for this rule:

```js
// function component
const MyComponent: React.FC<TProps> = () => <div />;

// class component
class MyComponent extends React.Component<TProps, TState> {}
class MyComponent extends React.PureComponent<TProps, TState> {}
```

## When Not To Use It

If your codebase explicity has a different naming convention re: React Component props typedefs.
