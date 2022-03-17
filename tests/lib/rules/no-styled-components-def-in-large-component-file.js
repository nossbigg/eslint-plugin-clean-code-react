/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-styled-components-def-in-large-component-file"),
  RuleTester = require("eslint").RuleTester;
const { getRuleTesterConfig } = require("../get-rule-tester-config");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(getRuleTesterConfig());
const ruleConfig = [{ largeComponentLength: 3 }];
ruleTester.run("no-styled-components-def-in-large-component-file", rule, {
  valid: [
    {
      code: `
      const MyComponent: React.FC = () => {
        return <div/>;
      };
      
      const StyledDiv = styled.div\`\`;
      const StyledMyComponent = styled(MyComponent)\`\`;
      `,
      options: ruleConfig,
    },
  ],

  invalid: [
    {
      code: `
      const MyComponent: React.FC = () => {
        1==1;
        return <div/>;
      };
      const StyledDiv = styled.div\`\`;
      const StyledMyComponent = styled(MyComponent)\`\`
      `,
      options: ruleConfig,
      errors: [
        {
          message: "No styled component definition in large component file.",
          type: "TaggedTemplateExpression",
        },
        {
          message: "No styled component definition in large component file.",
          type: "CallExpression",
        },
      ],
    },
  ],
});
