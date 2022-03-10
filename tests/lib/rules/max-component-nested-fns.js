/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/max-component-nested-fns"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleOptions = [{ maxFns: 3 }];
const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("max-component-nested-fns", rule, {
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
                constructor(){}
                render(){}
                onClick1 = () => {}
                onClick2(){
                  const onClick3 = () => {}
                }
              }`,
      options: ruleOptions,
    },
  ],

  invalid: [
    {
      code: `const MyComponent: React.FunctionComponent = () => {
        const fn1 = () => {};
        const fn2 = function(){};
        function fn3(){};
        const fn4 = () => {};
       return <div />
      }`,
      errors: [
        {
          message: "React component exceeds max number of nested functions.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleOptions,
    },
    {
      code: `class MyComponent extends React.Component {
        constructor(){}
        render(){}
        onClick1 = () => {}
        onClick2(){
          function onClick3(){}
        }
        onClick4(){}
      }`,
      errors: [
        {
          message: "React component exceeds max number of nested functions.",
          type: "ClassDeclaration",
        },
      ],
      options: ruleOptions,
    },
    {
      code: `class MyComponent extends React.Component {
        constructor(){}
        render(){}
        onClick1 = () => {}
        onClick2(){}
      }`,
      errors: [
        {
          message: "React component exceeds max number of nested functions.",
          type: "ClassDeclaration",
        },
      ],
      options: [{ maxFns: 3, excludedClassMethods: [] }],
    },
  ],
});
