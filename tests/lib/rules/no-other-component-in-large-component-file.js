/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-other-component-in-large-component-file"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());
const ruleConfig = [{ largeComponentLength: 5 }];
ruleTester.run("no-other-component-in-large-component-file", rule, {
  valid: [
    `const MyComponent: React.FC = () => { 
      return <div/>
    }`,
    {
      code: `const MyComponent: React.FC = () => {
        return (
          <div>
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        );
      };`,
      options: ruleConfig,
    },
  ],

  invalid: [
    {
      code: `const MyComponent: React.FC = () => {
        return (
          <div>
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        );
      };
      
      const MyComponent: React.FC = () => <div/>;
      `,
      errors: [
        {
          message: "No other component in large component file.",
          type: "VariableDeclaration",
        },
      ],
      options: ruleConfig,
    },
  ],
});
