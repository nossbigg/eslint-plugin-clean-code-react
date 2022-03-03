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
      description:
        "Ensures that `JSXElement` does not exceed max number of spread props.",
      category: "jsx",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: "object",
        properties: {
          maxSpreadProps: {
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

    const MAX_SPREAD_PROPS_DEFAULT = 2;
    const maxSpreadProps = getConfigOption(
      context,
      "maxSpreadProps",
      MAX_SPREAD_PROPS_DEFAULT
    );
    const excludedComponents = getConfigOption(
      context,
      "excludedComponents",
      []
    );
    const excludedComponentsSet = new Set(excludedComponents);

    return {
      JSXElement: (node) => {
        const { attributes, name } = node.openingElement;
        const isExcludedElement = excludedComponentsSet.has(name.name);
        if (isExcludedElement) {
          return;
        }

        const spreadAttributes = attributes.filter(
          (attr) => attr.type === "JSXSpreadAttribute"
        );
        const isExceedsSpreadProps = spreadAttributes.length > maxSpreadProps;
        if (!isExceedsSpreadProps) {
          return;
        }

        context.report({
          node: node.openingElement,
          message: "JSX Element exceeds max spread props.",
        });
      },
      // visitor functions for different types of nodes
    };
  },
};
