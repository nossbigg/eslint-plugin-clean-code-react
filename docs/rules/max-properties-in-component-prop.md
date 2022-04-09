# max-properties-in-component-prop

Component prop typedef does not exceed max properties.

## Rule Details

Component prop typedef with a large number of properties usually is an indicator that the component is too complex, or that the component API surface needs some tidying.

Examples of **incorrect** code for this rule:

```js
// typedef with >7 properties
type MyComponentProps = {
  firstName: string,
  lastName: string,
  designation: string,
  dayDateOfBirth: number,
  monthDateOfBirth: number,
  yearDateOfBirth: number,
  countryName: string,
  countryCode: string,
};
```

Examples of **correct** code for this rule:

```js
// grouping of related props into nested properties
type MyComponentProps = {
  name: UserName,
  dateOfBirth: UserDateOfBirth,
  country: UserCountry,
};

type UserName = {
  firstName: string,
  lastName: string,
  designation: string,
};

type UserDateOfBirth = {
  dayDateOfBirth: number,
  monthDateOfBirth: number,
  yearDateOfBirth: number,
};

type UserCountry = {
  name: string,
  code: string,
};
```

### Options

- `maxProps`: `number`, default: `7`
