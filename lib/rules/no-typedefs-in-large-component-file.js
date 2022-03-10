/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

const { getConfigOption } = require("../common/config-utils");
const {
  isReactClassComponent,
  isReactFunctionComponent,
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
        "Ensures that typedefs are not declared in the same file when a large component exists.",
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
          excludePropsTypedefs: {
            type: "boolean",
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

    const typedefs = [];

    const components = [];
    const largeComponentLength = getConfigOption(
      context,
      "largeComponentLength",
      50
    );
    const excludePropsTypedefs = getConfigOption(
      context,
      "excludePropsTypedefs",
      true
    );

    const getNodeLines = (node) => {
      const { start, end } = node.loc;
      return end.line - start.line + 1;
    };

    const isLargeComponent = (node) => {
      const nodeLines = getNodeLines(node);
      return nodeLines > largeComponentLength;
    };

    const isNotPropsTypedef = (node) => {
      const result = !node.id.name.includes("Props");
      return result;
    };

    const raiseLintError = (node) => {
      context.report({
        node,
        message: "No typedefs in large component file.",
      });
    };

    return {
      ArrowFunctionExpression: (node) => {
        if (isReactFunctionComponent(node)) {
          components.push(node);
        }
      },
      FunctionExpression: (node) => {
        if (isReactFunctionComponent(node)) {
          components.push(node);
        }
      },
      ClassDeclaration: (node) => {
        if (!isReactClassComponent(node)) {
          return;
        }
        components.push(node);
      },
      TSTypeAliasDeclaration: (node) => {
        if (node.id.type !== "Identifier") {
          return;
        }
        typedefs.push(node);
      },
      "Program:exit": () => {
        const largeComponents = components.filter(isLargeComponent);
        const hasLargeComponents = largeComponents.length > 0;
        if (!hasLargeComponents) {
          return;
        }

        const filteredTypedefs = !excludePropsTypedefs
          ? typedefs
          : typedefs.filter(isNotPropsTypedef);

        filteredTypedefs.forEach(raiseLintError);
      },
    };
  },
};
