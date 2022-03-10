/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

const { getConfigOption } = require("../common/config-utils");
const {
  isReactClassComponentType,
  isReactFunctionComponentFn,
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
        "Ensures that React Component declarations do not exceed max lines.",
      category: "component",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: "object",
        properties: {
          maxLines: {
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

    const components = [];
    const maxLines = getConfigOption(context, "maxLines", 100);

    const handleComponent = (node) => {
      const lines = getNodeLines(node);
      const isExceedsMaxLines = lines > maxLines;
      if (!isExceedsMaxLines) {
        return;
      }

      context.report({
        node,
        message: "React component exceeds max lines.",
      });
    };

    const getNodeLines = (node) => {
      const { start, end } = node.loc;
      return end.line - start.line + 1;
    };

    return {
      ArrowFunctionExpression: (node) => {
        if (isReactFunctionComponentFn(node)) {
          components.push(node);
        }
      },
      FunctionExpression: (node) => {
        if (isReactFunctionComponentFn(node)) {
          components.push(node);
        }
      },
      ClassDeclaration: (node) => {
        if (!isReactClassComponentType(node)) {
          return;
        }
        components.push(node);
      },
      "Program:exit": () => {
        components.forEach(handleComponent);
      },
    };
  },
};
