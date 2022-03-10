/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

const { getConfigOption } = require("../common/config-utils");
const { getJSXElementName } = require("../common/react-utils");

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
    const maxProps = getConfigOption(context, "maxProps", MAX_PROPS_DEFAULT);
    const excludedComponents = getConfigOption(
      context,
      "excludedComponents",
      []
    );

    const excludedComponentsSet = new Set(excludedComponents);

    return {
      JSXElement: (node) => {
        const { attributes, name } = node.openingElement;
        const elementName = getJSXElementName(name).join(".");
        const isExcludedElement = excludedComponentsSet.has(elementName);
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
