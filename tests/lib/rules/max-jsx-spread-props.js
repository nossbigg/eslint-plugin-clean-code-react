/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/max-jsx-spread-props"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("max-jsx-spread-props", rule, {
  valid: [
    `
     const MyComponent: React.FC = () => <AnotherComponent
       {...otherProps1}
       {...otherProps2}
     />
     `,
    // support excluding components from 3rd-party libs
    {
      code: `
       const MyComponent: React.FC = () => <UITable
       {...userProps} 
       {...groupProps}
       {...orgProps}
       />
       `,
      options: [{ maxSpreadProps: 2, excludedComponents: ["UITable"] }],
    },
  ],

  invalid: [
    {
      code: `
       const MyComponent: React.FC = () => <AnotherComponent
       {...otherProps1}
       {...otherProps2}
       {...otherProps3}
     />`,
      errors: [
        {
          message: "JSX Element exceeds max spread props.",
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `
       const MyComponent: React.FC = () => <SomeLib.AnotherComponent
       {...otherProps1}
       {...otherProps2}
       {...otherProps3}
     />`,
      errors: [
        {
          message: "JSX Element exceeds max spread props.",
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
