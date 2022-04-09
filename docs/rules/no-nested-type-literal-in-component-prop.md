# no-nested-type-literal-in-component-prop

Component prop typedef does not contain nested type literal.

## Rule Details

Given that a component prop typedef contains a nested type literal, it is not uncommon where a developer needs to use the aforementioned nested type literal separately - This rule encourages developers to refactor nested type literals into their own discrete type definitions.

Examples of **incorrect** code for this rule:

```js
type MyComponentProps = {
  // nested type literal
  user: { firstName: string, lastName: string },
};

type MyComponentProps = {
  // nested type literal
  user: {
    // nested type literal
    country: { name: "Singapore", code: "SGP" },
  },
};

type MyComponentProps = {
  // nested type literal
  onClick: (args: { name: string }) => void,
};

type MyComponentProps = {
  // nested type literal
  onClick(args: { name: string }): void,
};
```

Examples of **correct** code for this rule:

```js
type MyComponentProps = {
  name: string,
  onFocus: () => void,
};

// not a component props typedef, does not end with 'Props'
type SomeOtherType = {
  user: { firstName: string, lastName: string },
};
```

## When Not To Use It

When your coding convention permits for nested type literals in component prop typedefs.
