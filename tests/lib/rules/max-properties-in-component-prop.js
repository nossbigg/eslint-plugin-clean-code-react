/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/max-properties-in-component-prop"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());

const ruleOptions = [{ maxProps: 2 }];
ruleTester.run("max-properties-in-component-prop", rule, {
  valid: [
    {
      code: `
      type MyComponentProps = {
        prop1: string;
        prop2: string;
      };`,
      options: ruleOptions,
    },
    {
      code: `
      type SomeOtherType = {
        prop1: string;
        prop2: string;
        prop3: string;
      };`,
      options: ruleOptions,
    },
    {
      code: `
      type MyComponentProps = SomeOtherType`,
      options: ruleOptions,
    },
  ],

  invalid: [
    {
      code: `
      type MyComponentProps = {
        prop1: string;
        prop2: string;
        prop3: string;
      };`,
      errors: [
        {
          message: "Component prop typedef exceeds max properties.",
          type: "TSTypeAliasDeclaration",
        },
      ],
      options: ruleOptions,
    },
  ],
});
