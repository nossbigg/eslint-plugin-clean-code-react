/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

const _ = require("lodash");
const traverse = require("eslint-traverse");
const { getRuleSetting } = require("../common/shared-options-utils");
const { getNodeLines } = require("../common/ast-utils");
const {
  isReactFunctionComponentType,
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
        "Ensures that no external function definitions exist in the same file when a large component exists.",
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

    const largeComponentLength = getRuleSetting.largeComponentLength(context);

    const components = [];
    const externalFnDefinitions = [];

    const isLargeComponent = (node) => {
      const nodeLines = getNodeLines(node);
      return nodeLines > largeComponentLength;
    };

    const raiseLintError = (node) => {
      context.report({
        node,
        message: "No external function definition in large component file.",
      });
    };

    return {
      Program: (node) => {
        traverse(context, node, (path) => {
          if (path.node.type === "VariableDeclarator") {
            const tsTypeReference = _.get(
              path.node,
              "id.typeAnnotation.typeAnnotation"
            );
            if (
              tsTypeReference &&
              isReactFunctionComponentType(tsTypeReference)
            ) {
              components.push(path.node);
              return traverse.SKIP;
            }
          }

          if (path.node.type === "ClassDeclaration") {
            if (isReactClassComponentType(path.node)) {
              components.push(path.node);
              return traverse.SKIP;
            }
          }

          if (path.node.type === "FunctionDeclaration") {
            externalFnDefinitions.push(path.node);
            return;
          }

          if (path.node.type === "ArrowFunctionExpression") {
            externalFnDefinitions.push(path.node);
            return;
          }
        });
      },
      "Program:exit": () => {
        const largeComponents = components.filter(isLargeComponent);
        const hasLargeComponents = largeComponents.length > 0;
        if (!hasLargeComponents) {
          return;
        }

        externalFnDefinitions.forEach(raiseLintError);
      },
    };
  },
};
