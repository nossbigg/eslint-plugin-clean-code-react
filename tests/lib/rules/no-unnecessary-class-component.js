/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-unnecessary-class-component"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("no-unnecessary-class-component", rule, {
  valid: [
    `class MyComponent extends React.Component {
      static getDerivedStateFromError(){}
    }`,
    `class MyComponent extends React.Component {
      componentDidCatch(){}
    }`,
  ],

  invalid: [
    {
      code: "class MyComponent extends React.Component {}",
      errors: [
        {
          message:
            "Unnecessary class component; Consider refactoring to function component.",
          type: "ClassDeclaration",
        },
      ],
    },
  ],
});
