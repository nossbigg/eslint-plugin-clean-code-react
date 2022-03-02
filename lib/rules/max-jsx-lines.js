/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

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
      description: "Ensures that JSXElement blocks do not exceed max lines.",
      category: "jsx",
      recommended: true,
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
    const MAX_LINES_DEFAULT = 20;
    const getMaxLines = () => {
      const [config] = context.options;
      if (!config) {
        return MAX_LINES_DEFAULT;
      }

      return config.maxLines;
    };
    const maxLines = getMaxLines();

    return {
      JSXElement: (node) => {
        const { start, end } = node.loc;
        const exceedsMaxLines = end.line - start.line + 1 > maxLines;
        if (!exceedsMaxLines) {
          return;
        }

        context.report({ node, message: "JSX Element exceeds max lines." });
      },
      // visitor functions for different types of nodes
    };
  },
};
