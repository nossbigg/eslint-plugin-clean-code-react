/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

const { getConfigOption } = require("../common/config-utils");

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
      description: "JSX Expression blocks do not exceed max lines.",
      category: "jsx",
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: "object",
        properties: {
          maxJsxExpressionLines: {
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

    const MAX_LINES_DEFAULT = 3;
    const maxJsxExpressionLines = getConfigOption(
      context,
      "maxJsxExpressionLines",
      MAX_LINES_DEFAULT
    );

    return {
      JSXExpressionContainer: (node) => {
        const isEmptyExpression = node.expression.type === "JSXEmptyExpression";
        if (isEmptyExpression) {
          return;
        }

        const { start, end } = node.loc;
        const exceedsMaxLines =
          end.line - start.line + 1 > maxJsxExpressionLines;
        if (!exceedsMaxLines) {
          return;
        }

        context.report({ node, message: "JSX Expression exceeds max lines." });
      },
    };
  },
};
