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

const ruleOptions = [{ maxHooks: 1 }];
const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("max-fn-component-hooks", rule, {
  valid: [
    {
      code: `
      const MyComponent: React.FunctionComponent = () => {
        useState();
        return <div />;
      };`,
      options: ruleOptions,
    },
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: `
      const MyComponent: React.FunctionComponent = () => {
        useState();
        some.useMyHook();
        return <div />;
      };`,
      errors: [
        {
          message: "Too many hooks in React component.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleOptions,
    },
  ],
});
