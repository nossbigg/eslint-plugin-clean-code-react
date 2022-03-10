/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-external-fn-definition-in-large-component-file"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());
const ruleConfig = [{ largeComponentLength: 2 }];
ruleTester.run("no-external-fn-definition-in-large-component-file", rule, {
  valid: [
    {
      code: `const MyComponent: React.FC = () => { 
        return <div/>};
        const someHelperFn = () => {}
  `,
      options: ruleConfig,
    },
  ],

  invalid: [
    {
      code: `const MyComponent: React.FC = () => { 
        return <div/>
      };
        const someHelperFn = () => {}`,
      errors: [
        {
          message: "No external function definition in large component file.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleConfig,
    },
  ],
});
