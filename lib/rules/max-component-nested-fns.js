/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";
const traverse = require("eslint-traverse");
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
        "Ensures component does not exceed max number of nested functions.",
      category: "component",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: "object",
        properties: {
          maxFns: {
            type: "number",
          },
          excludedClassMethods: {
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

    const classComponents = [];
    const fnComponents = [];

    const maxFns = getConfigOption(context, "maxFns", 5);
    const excludedClassMethods = getConfigOption(
      context,
      "excludedClassMethods",
      ["render", "constructor"]
    );
    const excludedClassMethodsSet = new Set(excludedClassMethods);

    const handleFnComponent = (node) => {
      // exclude component fn definition
      let fnsCount = -1;
      traverse(context, node, (path) => {
        if (path.node.type === "ArrowFunctionExpression") {
          fnsCount++;
          return;
        }

        if (path.node.type === "FunctionDeclaration") {
          fnsCount++;
          return;
        }

        if (path.node.type === "FunctionExpression") {
          fnsCount++;
          return;
        }
      });

      const exceedsMaxFns = fnsCount > maxFns;
      if (!exceedsMaxFns) {
        return;
      }

      context.report({
        node,
        message: "React component exceeds max number of nested functions.",
      });
    };

    const handleClassComponent = (node) => {
      let fnsCount = 0;
      traverse(context, node, (path) => {
        if (path.node.type === "ArrowFunctionExpression") {
          if (
            path.node.parent.type === "PropertyDefinition" &&
            excludedClassMethodsSet.has(path.node.parent.key.name)
          ) {
            return;
          }

          fnsCount++;
          return;
        }

        if (path.node.type === "FunctionDeclaration") {
          fnsCount++;
          return;
        }

        if (path.node.type === "FunctionExpression") {
          if (
            path.node.parent.type === "MethodDefinition" &&
            excludedClassMethodsSet.has(path.node.parent.key.name)
          ) {
            return;
          }

          fnsCount++;
          return;
        }
      });

      const exceedsMaxFns = fnsCount > maxFns;
      if (!exceedsMaxFns) {
        return;
      }

      context.report({
        node,
        message: "React component exceeds max number of nested functions.",
      });
    };

    return {
      ArrowFunctionExpression: (node) => {
        if (isReactFunctionComponent(node)) {
          fnComponents.push(node);
        }
      },
      FunctionExpression: (node) => {
        if (isReactFunctionComponent(node)) {
          fnComponents.push(node);
        }
      },
      ClassDeclaration: (node) => {
        if (!isReactClassComponent(node)) {
          return;
        }
        classComponents.push(node);
      },
      "Program:exit": () => {
        fnComponents.forEach(handleFnComponent);
        classComponents.forEach(handleClassComponent);
      },
    };
  },
};
