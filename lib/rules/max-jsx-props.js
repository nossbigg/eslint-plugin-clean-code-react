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
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description:
        "Ensures that `JSXElement` does not exceed max number of props.",
      category: "jsx",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: "object",
        properties: {
          maxProps: {
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

    const MAX_PROPS_DEFAULT = 5;
    const getMaxProps = () => {
      const [config] = context.options;
      if (!config) {
        return MAX_PROPS_DEFAULT;
      }

      return config.maxProps;
    };
    const maxProps = getMaxProps();

    return {
      JSXElement: (node) => {
        const { attributes } = node.openingElement;
        const isExceedsProps = attributes.length > maxProps;
        console.log(attributes.length);
        if (!isExceedsProps) {
          return;
        }

        context.report({
          node: node.openingElement,
          message: "JSX Element exceeds max props.",
        });
      },
      // visitor functions for different types of nodes
    };
  },
};
