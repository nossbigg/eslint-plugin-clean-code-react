/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-jsx-inline-style-prop"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("no-jsx-inline-style-prop", rule, {
  valid: [
    `
    const someStyle = {color: 'red'};
    const MyComponent: React.FC = () => <div style={someStyle} />;`,
  ],

  invalid: [
    {
      code: `
      const MyComponent: React.FC = () => <div style={{color: 'red'}} />;`,
      errors: [{ message: "No inline style prop.", type: "JSXAttribute" }],
    },
  ],
});
