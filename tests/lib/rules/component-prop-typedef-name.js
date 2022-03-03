/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/component-prop-typedef-name"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("component-prop-typedef-name", rule, {
  valid: [
    `const MyComponent: React.FC<TProps> = () => <div />`,
    `class MyComponent extends React.Component<TProps, TState> {}`,
    `class MyComponent extends React.PureComponent<TProps, TState> {}`,
  ],

  invalid: [
    {
      code: `const MyComponent: React.FC<MyComponentType> = () => <div />`,
      errors: [
        {
          message:
            "React Component props typedef name does not contain 'Props'.",
          type: "TSTypeReference",
        },
      ],
    },
    {
      code: `class MyComponent extends React.Component<TProp, TState> {}`,
      errors: [
        {
          message:
            "React Component props typedef name does not contain 'Props'.",
          type: "TSTypeReference",
        },
      ],
    },
    {
      code: `class MyComponent extends React.PureComponent<TProp, TState> {}`,
      errors: [
        {
          message:
            "React Component props typedef name does not contain 'Props'.",
          type: "TSTypeReference",
        },
      ],
    },
  ],
});
