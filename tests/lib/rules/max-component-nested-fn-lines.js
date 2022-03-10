/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/max-component-nested-fn-lines"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleOptions = [{ maxFnLines: 2 }];
const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("max-component-nested-fn-lines", rule, {
  valid: [
    {
      code: `const MyComponent: React.FunctionComponent = () => {
                const fn1 = () => {};
                const fn2 = function(){};
                function fn3(){};
               return <div />
              }`,
      options: ruleOptions,
    },
    {
      code: `class MyComponent extends React.Component {
                constructor(){
                  // line1
                  // line2
                  // line3
                }
                render(){
                  // line1
                  // line2
                  // line3
                }
                onClick1 = () => {}
                onClick2(){}
              }`,
      options: ruleOptions,
    },
  ],

  invalid: [
    {
      code: `const MyComponent: React.FunctionComponent = () => {
        const fn1 = () => {
          // line1
          // line2
          // line3
        };
        const fn2 = function(){};
        function fn3(){};
       return <div />
      }`,
      errors: [
        {
          message: "Nested function in React component exceeds max lines.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleOptions,
    },
    {
      code: `class MyComponent extends React.Component {
        constructor(){}
        render(){}
        onClick1 = () => {
          // line1
          // line2
          // line3
        }
        onClick2(){}
      }`,
      errors: [
        {
          message: "Nested function in React component exceeds max lines.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleOptions,
    },
    {
      code: `class MyComponent extends React.Component {
        constructor(){
          // line1
          // line2
          // line3
        }
        render(){}
        onClick1 = () => {}
        onClick2(){}
      }`,
      errors: [
        {
          message: "Nested function in React component exceeds max lines.",
          type: "FunctionExpression",
        },
      ],
      options: [{ maxFnLines: 3, excludedClassMethods: [] }],
    },
  ],
});
