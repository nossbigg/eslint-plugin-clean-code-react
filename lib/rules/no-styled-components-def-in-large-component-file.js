/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

const { getRuleSetting } = require("../common/shared-options-utils");
const { isLargeComponent } = require("../common/ast-utils");
const {
  isReactFunctionComponent,
  isReactClassComponent,
} = require("../common/react-utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: "problem", // `problem`, `suggestion`, or `layout`
    docs: {
      description:
        "Ensures that no styled components are declared in large component file.",
      category: "component",
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: "object",
        properties: {
          largeComponentLength: {
            type: "number",
          },
        },
        additionalProperties: false,
      },
    ], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    const styledComponents = [];

    const reactComponents = [];
    const largeComponentLength = getRuleSetting.largeComponentLength(context);

    const raiseLintError = (node) => {
      context.report({
        node,
        message: "No styled component definition in large component file.",
      });
    };

    return {
      TaggedTemplateExpression: (node) => {
        if (node.tag.type !== "MemberExpression") {
          return;
        }
        if (
          node.tag.object.type === "Identifier" &&
          node.tag.object.name === "styled"
        ) {
          styledComponents.push(node);
        }
      },
      CallExpression: (node) => {
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "styled"
        ) {
          styledComponents.push(node);
        }
      },
      ArrowFunctionExpression: (node) => {
        if (isReactFunctionComponent(node)) {
          reactComponents.push(node);
        }
      },
      FunctionExpression: (node) => {
        if (isReactFunctionComponent(node)) {
          reactComponents.push(node);
        }
      },
      ClassDeclaration: (node) => {
        if (!isReactClassComponent(node)) {
          return;
        }
        reactComponents.push(node);
      },
      "Program:exit": () => {
        const largeComponents = reactComponents.filter(
          isLargeComponent(largeComponentLength)
        );
        const hasLargeComponents = largeComponents.length > 0;
        if (!hasLargeComponents) {
          return;
        }

        styledComponents.forEach(raiseLintError);
      },
    };
  },
};
