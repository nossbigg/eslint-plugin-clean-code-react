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
      description: "Ensures that JSX Element does not contain inline style prop.",
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
        const jsxAttributes = attributes.filter(
          (attr) => attr.type === "JSXAttribute"
        );

        jsxAttributes.forEach((attr) => {
          const isStyleProp =
            attr.name.type === "JSXIdentifier" && attr.name.name === "style";
          if (!isStyleProp) {
            return;
          }

          const isIdentifierValue = attr.value.expression.type === "Identifier";
          if (isIdentifierValue) {
            return;
          }

          context.report({
            node: attr,
            message: "No inline style prop.",
          });
        });
      },
    };
  },
};
