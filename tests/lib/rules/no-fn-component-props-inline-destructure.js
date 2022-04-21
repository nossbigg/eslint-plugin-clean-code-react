/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-fn-component-props-inline-destructure"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("no-fn-component-props-inline-destructure", rule, {
  valid: [
    `const MyComponent: React.FC = () => <div />`,
    `const MyComponent: React.FC = (props) => <div />`,
    // do not apply to non-component functions
    `const someOtherFn = ({name}) => undefined`,
  ],

  invalid: [
    {
      code: `const MyComponent: React.FC = ({children}) => <div />`,
      errors: [
        {
          message: "Function component props inline destructure not allowed.",
          type: "ObjectPattern",
        },
      ],
    },
    {
      code: `const MyComponent: React.FC = function({children}){return <div />}`,
      errors: [
        {
          message: "Function component props inline destructure not allowed.",
          type: "ObjectPattern",
        },
      ],
    },
    {
      code: `function MyComponent({children}){return <div />}`,
      errors: [
        {
          message: "Function component props inline destructure not allowed.",
          type: "ObjectPattern",
        },
      ],
    },
  ],
});
