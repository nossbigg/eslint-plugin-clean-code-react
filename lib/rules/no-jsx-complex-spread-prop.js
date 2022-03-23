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
      description: "JSX Element does not contain complex spread props.",
      category: "jsx",
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
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

    return {
      JSXElement: (node) => {
        const { attributes } = node.openingElement;
        const spreadAttributes = attributes.filter(
          (attr) => attr.type === "JSXSpreadAttribute"
        );

        spreadAttributes.forEach((attr) => {
          const isIdentifier = attr.argument.type === "Identifier";
          if (isIdentifier) {
            return;
          }

          context.report({
            node: attr,
            message: "No complex spread props.",
          });
        });
      },
    };
  },
};
