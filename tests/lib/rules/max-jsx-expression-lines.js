/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/max-jsx-expression-lines"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());

const ruleOptions = [{ maxLines: 3 }];
ruleTester.run("max-jsx-expression-lines", rule, {
  valid: [
    // case: truthy check
    `const MyComponent: React.FC = () => <div>
      {true && <div>Some Text</div>}
    </div>`,
    // case: ternary
    `const MyComponent: React.FC = () => <div>
      {true
        ? "true"
        : "false"}
    </div>`,
    // case: comments
    `const MyComponent: React.FC = () => <div>
      {
        // comment 1
        // comment 2
        // comment 3
        // comment 4
      }
    </div>`,
  ],

  invalid: [
    // case: long expression
    {
      code: `const MyComponent: React.FC = () => <div>
        {true && <div>
          Some Text
          Some Text
        </div>}
      </div>`,
      errors: [
        {
          message: "JSX Expression exceeds max lines.",
          type: "JSXExpressionContainer",
        },
      ],
      options: ruleOptions,
    },
  ],
});
