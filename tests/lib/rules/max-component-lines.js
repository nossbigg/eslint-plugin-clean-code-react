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

// Note: Also doubles as exhaustive test for component matching logic

const ruleOptions = [{ maxComponentLines: 3 }];
const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("max-component-lines", rule, {
  valid: [
    {
      code: `const MyComponent: FunctionComponent = () => {
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
    // :function component
    // FunctionComponent
    {
      code: `const MyComponent: FunctionComponent = () => {
        1==1;
        return <div />
       }`,
      errors: [
        {
          message: "React component exceeds max lines.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleOptions,
    },
    // FC
    {
      code: `const MyComponent: FC = () => {
        1==1;
        return <div />
       }`,
      errors: [
        {
          message: "React component exceeds max lines.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleOptions,
    },
    // StatelessComponent
    {
      code: `const MyComponent: StatelessComponent = () => {
        1==1;
        return <div />
       }`,
      errors: [
        {
          message: "React component exceeds max lines.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleOptions,
    },
    // SFC
    {
      code: `const MyComponent: SFC = () => {
        1==1;
        return <div />
       }`,
      errors: [
        {
          message: "React component exceeds max lines.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleOptions,
    },
    // VoidFunctionComponent
    {
      code: `const MyComponent: VoidFunctionComponent = () => {
        1==1;
        return <div />
       }`,
      errors: [
        {
          message: "React component exceeds max lines.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleOptions,
    },
    // VFC
    {
      code: `const MyComponent: VFC = () => {
        1==1;
        return <div />
       }`,
      errors: [
        {
          message: "React component exceeds max lines.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleOptions,
    },
    // React.FunctionComponent
    {
      code: `const MyComponent: React.FunctionComponent = () => {
        1==1;
        return <div />
       }`,
      errors: [
        {
          message: "React component exceeds max lines.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleOptions,
    },
    // React.FC
    {
      code: `const MyComponent: React.FC = () => {
        1==1;
        return <div />
       }`,
      errors: [
        {
          message: "React component exceeds max lines.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleOptions,
    },
    // React.StatelessComponent
    {
      code: `const MyComponent: React.StatelessComponent = () => {
        1==1;
        return <div />
       }`,
      errors: [
        {
          message: "React component exceeds max lines.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleOptions,
    },
    // React.SFC
    {
      code: `const MyComponent: React.SFC = () => {
        1==1;
        return <div />
       }`,
      errors: [
        {
          message: "React component exceeds max lines.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleOptions,
    },
    // React.VoidFunctionComponent
    {
      code: `const MyComponent: React.VoidFunctionComponent = () => {
        1==1;
        return <div />
       }`,
      errors: [
        {
          message: "React component exceeds max lines.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleOptions,
    },
    // React.VFC
    {
      code: `const MyComponent: React.VFC = () => {
        1==1;
        return <div />
       }`,
      errors: [
        {
          message: "React component exceeds max lines.",
          type: "ArrowFunctionExpression",
        },
      ],
      options: ruleOptions,
    },
    // class component
    // Component
    {
      code: `class MyComponent extends Component<TProp, TState> {
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
    // PureComponent
    {
      code: `class MyComponent extends PureComponent<TProp, TState> {
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
    // React.Component
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
    // React.PureComponent
    {
      code: `class MyComponent extends React.PureComponent<TProp, TState> {
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
