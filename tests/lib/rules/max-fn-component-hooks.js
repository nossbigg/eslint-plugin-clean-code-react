/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/max-fn-component-hooks"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("max-fn-component-hooks", rule, {
  valid: [
    `
    const MyComponent: React.FunctionComponent = () => {
      useState();
      return <div />;
    };`,
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: `
      const MyComponent: React.FunctionComponent = () => {
        useState();
        useState();
        useState();
        useState();
        useState();
        some.useMyHook();
        return <div />;
      };`,
      errors: [
        {
          message: "Too many hooks in React component.",
          type: "VariableDeclaration",
        },
      ],
    },
  ],
});
