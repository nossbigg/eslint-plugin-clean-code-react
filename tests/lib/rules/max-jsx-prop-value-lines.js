/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/max-jsx-prop-value-lines"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());
const ruleOptions = [{ maxPropLines: 1 }];
ruleTester.run("max-jsx-prop-value-lines", rule, {
  valid: [
    {
      code: `const MyComponent: React.FC = () => { 
        return <Row 
          onClick={() => { noop; }}
        />
      };
  `,
      options: ruleOptions,
    },
  ],

  invalid: [
    {
      code: `const MyComponent: React.FC = () => { 
        return <Row 
          onClick={() => {
            noop;
          }}
        />
      };`,
      errors: [
        {
          message: "JSX prop value exceeds max lines.",
          type: "JSXAttribute",
        },
      ],
      options: ruleOptions,
    },
  ],
});
