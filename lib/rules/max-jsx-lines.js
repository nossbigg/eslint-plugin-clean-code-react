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
      description: "JSX Element blocks do not exceed max lines.",
      category: "jsx",
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: "object",
        properties: {
          maxJsxLines: {
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
    const MAX_LINES_DEFAULT = 30;
    const maxJsxLines = getConfigOption(
      context,
      "maxJsxLines",
      MAX_LINES_DEFAULT
    );

    return {
      JSXElement: (node) => {
        const { start, end } = node.loc;
        const exceedsMaxLines = end.line - start.line + 1 > maxJsxLines;
        if (!exceedsMaxLines) {
          return;
        }

        context.report({ node, message: "JSX Element exceeds max lines." });
      },
      // visitor functions for different types of nodes
    };
  },
};
