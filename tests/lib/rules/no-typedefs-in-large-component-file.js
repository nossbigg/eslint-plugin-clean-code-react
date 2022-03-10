/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-typedefs-in-large-component-file"),
  RuleTester = require("eslint").RuleTester;

const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());
const ruleConfig = [{ largeComponentLength: 2 }];
ruleTester.run("no-typedefs-in-large-component-file", rule, {
  valid: [
    {
      code: `const MyComponent: React.FC<MyComponentProps> = () => { 
        return <div/>;
      }`,
      options: ruleConfig,
    },
    {
      code: `const MyComponent: React.FC<MyComponentProps> = () => { 
        return <div/>;
      };
      type MyComponentProps = {};
      `,
      options: ruleConfig,
    },
    {
      code: `const MyComponent: React.FC<MyComponentProps> = () => <div/>;
      type SomeOtherTypedef = {};
      `,
      options: ruleConfig,
    },
  ],

  invalid: [
    {
      code: `const MyComponent: React.FC<MyComponentProps> = () => { 
        return <div/>;
      };
      type SomeOtherTypedef = {};
      `,
      errors: [
        {
          message: "No typedefs in large component file.",
          type: "TSTypeAliasDeclaration",
        },
      ],
      options: ruleConfig,
    },
    {
      code: `const MyComponent: React.FC<MyComponentProps> = () => { 
        return <div/>;
      };
      type MyComponentProps = {};
      `,
      errors: [
        {
          message: "No typedefs in large component file.",
          type: "TSTypeAliasDeclaration",
        },
      ],
      options: [{ largeComponentLength: 2, excludePropsTypedefs: false }],
    },
  ],
});
