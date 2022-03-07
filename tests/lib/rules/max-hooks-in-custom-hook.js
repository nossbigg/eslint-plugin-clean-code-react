/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/max-hooks-in-custom-hook"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleOptions = [{ maxHooks: 1 }];
const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("max-hooks-in-custom-hook", rule, {
  valid: [
    {
      code: `const useMyHook = () => {
        useState();
      }`,
      options: ruleOptions,
    },
    {
      code: `function useMyHook(){
        useState();
      }`,
      options: ruleOptions,
    },
  ],

  invalid: [
    {
      code: `const useMyHook = () => {
        useState();
        some.useState();
      }`,
      errors: [
        {
          message: "Too many hooks in custom hook.",
          type: "VariableDeclarator",
        },
      ],
      options: ruleOptions,
    },
    {
      code: `function useMyHook(){
        useState();
        some.useState();
      }`,
      errors: [
        {
          message: "Too many hooks in custom hook.",
          type: "FunctionDeclaration",
        },
      ],
      options: ruleOptions,
    },
    {
      code: `const useMyHook = () => {
        const useMyNestedHook = () => {
          useState();
          some.useState();
        }    
      }`,
      errors: [
        {
          message: "Too many hooks in custom hook.",
          type: "VariableDeclarator",
        },
        {
          message: "Too many hooks in custom hook.",
          type: "VariableDeclarator",
        },
      ],
      options: ruleOptions,
    },
  ],
});
