/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/max-jsx-lines"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("max-jsx-lines", rule, {
  valid: ["const MyComponent: React.FC = () => <div></div>"],

  invalid: [
    // case: single JSXElement
    {
      code: `const MyComponent: React.FC = () => <div>${"\n".repeat(21)}</div>`,
      errors: [
        { message: "JSX Element exceeds max lines.", type: "JSXElement" },
      ],
    },
    // case: nested JSXElement
    {
      code: `const MyComponent: React.FC = () => <div>
        {true && <div>${"\n".repeat(21)}</div>}
      </div>`,
      errors: [
        { message: "JSX Element exceeds max lines.", type: "JSXElement" },
        { message: "JSX Element exceeds max lines.", type: "JSXElement" },
      ],
    },
  ],
});
