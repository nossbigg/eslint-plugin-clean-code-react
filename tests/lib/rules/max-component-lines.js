/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/max-component-lines"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleOptions = [{ maxLines: 3 }];
const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("max-component-lines", rule, {
  valid: [
    {
      code: `const MyComponent: React.FunctionComponent = () => {
               return <div />
              }`,
      options: ruleOptions,
    },
    {
      code: `class MyComponent extends React.Component<TProp, TState> {
        render(){ return <div/> }
      }`,
      options: ruleOptions,
    },
  ],

  invalid: [
    {
      code: `const MyComponent: React.FunctionComponent = () => {
        1==1;
        return <div />
       }`,
      errors: [
        {
          message: "React component exceeds max lines.",
          type: "VariableDeclaration",
        },
      ],
      options: ruleOptions,
    },
    {
      code: `class MyComponent extends React.Component<TProp, TState> {
        render(){ 
          return <div/>
        }
      }`,
      errors: [
        {
          message: "React component exceeds max lines.",
          type: "ClassDeclaration",
        },
      ],
      options: ruleOptions,
    },
  ],
});
