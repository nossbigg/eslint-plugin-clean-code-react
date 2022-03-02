/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/max-jsx-props"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());
ruleTester.run("max-jsx-props", rule, {
  valid: [
    `
    const MyComponent: React.FC = () => <AnotherComponent
      firstName={firstName}
      lastName={lastName}
      user={user}
      isAdmin
      isShowOnly
    />
    `,
    // support excluding components from 3rd-party libs
    {
      code: `
      const MyComponent: React.FC = () => <UITable
        data={data}  
        headerConfig={headerConfig}
        border={borderConfig}
        isResponsive
        isMultiTabView
        hideBottomBar
      />
      `,
      options: [{ excludedComponents: ["UITable"] }],
    },
  ],

  invalid: [
    {
      code: `
      const MyComponent: React.FC = () => <AnotherComponent
      firstName={firstName}
      lastName={lastName}
      user={user}
      isAdmin
      isShowOnly
      {...someOtherProps}
    />`,
      errors: [
        {
          message: "JSX Element exceeds max props.",
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
