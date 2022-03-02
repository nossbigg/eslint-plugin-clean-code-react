/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-jsx-complex-spread-prop"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("no-jsx-complex-spread-prop", rule, {
  valid: [
    `
    const computedProps = isAdmin ? adminProps : {};

    const MyComponent: React.FC = () => <AnotherComponent {...computedProps} />;
      `,
  ],

  invalid: [
    {
      code: `
      const MyComponent: React.FC = () => (
        <AnotherComponent {...(isAdmin ? adminProps : {})} />
      );`,
      errors: [
        {
          message: "No complex spread props.",
          type: "JSXSpreadAttribute",
        },
      ],
    },
  ],
});
