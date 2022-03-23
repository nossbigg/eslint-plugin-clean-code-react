/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

const { getConfigOption } = require("../common/config-utils");
const { getNodeLines } = require("../common/ast-utils");

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
      description: "JSX Element prop value does not exceed max lines.",
      category: "jsx",
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: "object",
        properties: {
          maxPropLines: {
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

    const maxPropLines = getConfigOption(context, "maxPropLines", 1);

    return {
      JSXAttribute: (node) => {
        const nodeLines = getNodeLines(node);
        const exceedsLines = nodeLines > maxPropLines;
        if (!exceedsLines) {
          return;
        }

        context.report({
          node,
          message: "JSX prop value exceeds max lines.",
        });
      },
    };
  },
};
