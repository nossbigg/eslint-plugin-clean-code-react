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
          excludedComponents: {
            type: "array",
            items: {
              type: "string",
            },
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
    const getConfig = () => {
      const [config] = context.options;
      if (!config) {
        return { maxProps: MAX_PROPS_DEFAULT, excludedComponents: [] };
      }

      const maxProps =
        config.maxProps === undefined ? MAX_PROPS_DEFAULT : config.maxProps;
      const excludedComponents =
        config.excludedComponents === undefined
          ? []
          : config.excludedComponents;
      return { maxProps, excludedComponents };
    };
    const { maxProps, excludedComponents } = getConfig();
    const excludedComponentsSet = new Set(excludedComponents);

    return {
      JSXElement: (node) => {
        const { attributes, name } = node.openingElement;
        const isExcludedElement = excludedComponentsSet.has(name.name);
        if (isExcludedElement) {
          return;
        }

        const isExceedsProps = attributes.length > maxProps;
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
