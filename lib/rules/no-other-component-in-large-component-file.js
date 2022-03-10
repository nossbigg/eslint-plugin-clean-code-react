/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

const _ = require("lodash");
const { getConfigOption } = require("../common/config-utils");
const {
  addIfReactFunctionComponentType,
  isReactClassComponentType,
} = require("../common/react-utils");

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
        "Ensures that no other components exist in the same file when a large component exists.",
      category: "component",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: "object",
        properties: {
          largeComponentLength: {
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

    const components = [];
    const largeComponentLength = getConfigOption(
      context,
      "largeComponentLength",
      50
    );

    const getNodeLines = (node) => {
      const { start, end } = node.loc;
      return end.line - start.line + 1;
    };

    const isLargeComponent = (node) => {
      const nodeLines = getNodeLines(node);
      return nodeLines > largeComponentLength;
    };

    const raiseLintError = (node) => {
      context.report({
        node,
        message: "No other component in large component file.",
      });
    };

    return {
      TSTypeReference: (node) => {
        addIfReactFunctionComponentType(components, node);
      },
      ClassDeclaration: (node) => {
        if (!isReactClassComponentType(node)) {
          return;
        }
        components.push(node);
      },
      "Program:exit": () => {
        const largeComponents = components.filter(isLargeComponent);
        const hasLargeComponents = largeComponents.length > 0;
        if (!hasLargeComponents) {
          return;
        }

        // don't raise lint error for first large component
        const [, ...otherLargeComponents] = largeComponents;
        const nonLargeComponents = components.filter(
          _.negate(isLargeComponent)
        );

        otherLargeComponents.forEach(raiseLintError);
        nonLargeComponents.forEach(raiseLintError);
      },
    };
  },
};