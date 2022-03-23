# max-hooks-in-custom-hook

Custom React Hooks do not use more than max hooks.

## Rule Details

Custom React Hooks that use many hooks internally are complex and hard to reason about.

Examples of **incorrect** code for this rule:

```js
// uses >5 hooks
const useMyHook = () => {
  useMyEffect();
  useMyEffect();
  useMyEffect();
  useMyEffect();
  useMyEffect();
  some.useMyEffect();
};
```

Examples of **correct** code for this rule:

```js
// uses 5 or less hooks
const useMyHook = () => {
  useMyEffect();
  useMyEffect();
  useMyEffect();
  useMyEffect();
  some.useMyEffect();
};
```

### Options

- `maxHooks`: `number`, default: `5`
