/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-component-prop-inline-typedef"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("no-component-prop-inline-typedef", rule, {
  valid: [
    `const MyComponent: React.FC<TProps> = () => <div />`,
    `class MyComponent extends React.Component<TProps> {}`,
    `class MyComponent extends React.PureComponent<TProps> {}`,
  ],

  invalid: [
    {
      code: `const MyComponent: React.FC<{}> = () => <div />`,
      errors: [
        {
          message: "Inline typedef for React Component not allowed.",
          type: "TSTypeLiteral",
        },
      ],
    },
    {
      code: `class MyComponent extends React.Component<{}> {}`,
      errors: [
        {
          message: "Inline typedef for React Component not allowed.",
          type: "TSTypeLiteral",
        },
      ],
    },
    {
      code: `class MyComponent extends React.PureComponent<{}> {}`,
      errors: [
        {
          message: "Inline typedef for React Component not allowed.",
          type: "TSTypeLiteral",
        },
      ],
    },
    // nested type literal
    {
      code: `const MyComponent: React.FC<TProps<{}>> = () => <div />`,
      errors: [
        {
          message: "Inline typedef for React Component not allowed.",
          type: "TSTypeLiteral",
        },
      ],
    },
  ],
});
