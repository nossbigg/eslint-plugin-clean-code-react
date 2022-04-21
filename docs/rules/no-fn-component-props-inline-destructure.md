# no-fn-component-props-inline-destructure

No function component props inline destructure.

## Rule Details

For React Function components, an inline destructure of the `props` argument usually results in a _bloated initial function definition_, especially with codebases using a code formatter (eg. `prettier`)

It is preferred to destructure the `props` argument separately within the function body to keep the initial function definition tidier and easier to read.

Examples of **incorrect** code for this rule:

```js
// props destructure results in initial function definition spanning multiple lines, not ideal
const MyComponent: React.FC<MyProps> = ({
  firstName,
  lastName,
  countryLabel,
  countryCode,
  dateDay,
  dateMonth,
  dateYear,
}) => {
  return <div />;
};
```

Examples of **correct** code for this rule:

```js
const MyComponent: React.FC<MyProps> = (props) => {
  const {
    firstName,
    lastName,
    countryLabel,
    countryCode,
    dateDay,
    dateMonth,
    dateYear,
  } = props;
  return <div />;
};
```

## When Not To Use It

When your codestyle permits or prefers `props` inline destructuring.
