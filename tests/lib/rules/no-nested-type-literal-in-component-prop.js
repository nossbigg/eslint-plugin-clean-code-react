/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-nested-type-literal-in-component-prop"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("no-nested-typedef-in-component-prop", rule, {
  valid: [
    `type MyComponentProps = {
      name: string;
      onFocus: () => void;
    };`,
    `type SomeOtherType = {
      user: { firstName: string; lastName: string };
    };`,
  ],

  invalid: [
    {
      code: `
      type MyComponentProps = {
        user: { firstName: string; lastName: string };
      };`,
      errors: [
        {
          message: "No nested type literal in component prop typedef.",
          type: "TSTypeLiteral",
        },
      ],
    },
    {
      code: `
      type MyComponentProps = {
        user: {
          country: { name: "Singapore"; code: "SGP" };
        };
      };`,
      errors: [
        {
          message: "No nested type literal in component prop typedef.",
          type: "TSTypeLiteral",
        },
        {
          message: "No nested type literal in component prop typedef.",
          type: "TSTypeLiteral",
        },
      ],
    },
    {
      code: `
      type MyComponentProps = {
        onClick: (args: { name: string }) => void;
      };`,
      errors: [
        {
          message: "No nested type literal in component prop typedef.",
          type: "TSTypeLiteral",
        },
      ],
    },
    {
      code: `
      type MyComponentProps = {
        onClick(args: { name: string }): void;
      };`,
      errors: [
        {
          message: "No nested type literal in component prop typedef.",
          type: "TSTypeLiteral",
        },
      ],
    },
  ],
});
