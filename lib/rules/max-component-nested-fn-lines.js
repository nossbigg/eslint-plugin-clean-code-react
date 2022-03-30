/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";
const traverse = require("eslint-traverse");
const { getConfigOption } = require("../common/config-utils");
const { getRuleSetting } = require("../common/shared-options-utils");
const { getNodeLines } = require("../common/ast-utils");
const {
  isReactClassComponent,
  isReactFunctionComponent,
  isReactFunctionComponentDecl,
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
        "Nested functions within React Component does not exceed max lines.",
      category: "component",
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: "object",
        properties: {
          maxFnLines: {
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

    const jsCompatMode = getRuleSetting.jsCompatMode(context);

    const maxFnLines = getConfigOption(context, "maxFnLines", 5);
    const excludedClassMethods = getConfigOption(
      context,
      "excludedClassMethods",
      ["render", "constructor"]
    );
    const excludedClassMethodsSet = new Set(excludedClassMethods);

    const handleNestedFns = (nestedFns) => {
      nestedFns.forEach((node) => {
        const nodeLines = getNodeLines(node);
        const isExceedsMaxLines = nodeLines > maxFnLines;
        if (!isExceedsMaxLines) {
          return;
        }

        context.report({
          node,
          message: "Nested function in React component exceeds max lines.",
        });
      });
    };

    const handleFnComponent = (node) => {
      const nestedFns = [];

      traverse(context, node.body, (path) => {
        if (path.node.type === "ArrowFunctionExpression") {
          nestedFns.push(path.node);
          return;
        }

        if (path.node.type === "FunctionDeclaration") {
          nestedFns.push(path.node);
          return;
        }

        if (path.node.type === "FunctionExpression") {
          nestedFns.push(path.node);
          return;
        }
      });

      handleNestedFns(nestedFns);
    };

    const handleClassComponent = (node) => {
      const nestedFns = [];

      traverse(context, node, (path) => {
        if (path.node.type === "ArrowFunctionExpression") {
          if (
            path.node.parent.type === "PropertyDefinition" &&
            excludedClassMethodsSet.has(path.node.parent.key.name)
          ) {
            return;
          }

          nestedFns.push(path.node);
          return;
        }

        if (path.node.type === "FunctionDeclaration") {
          nestedFns.push(path.node);
          return;
        }

        if (path.node.type === "FunctionExpression") {
          if (
            path.node.parent.type === "MethodDefinition" &&
            excludedClassMethodsSet.has(path.node.parent.key.name)
          ) {
            return;
          }

          nestedFns.push(path.node);
          return;
        }
      });

      handleNestedFns(nestedFns);
    };

    return {
      ArrowFunctionExpression: (node) => {
        if (isReactFunctionComponent(node, jsCompatMode)) {
          fnComponents.push(node);
        }
      },
      FunctionExpression: (node) => {
        if (isReactFunctionComponent(node, jsCompatMode)) {
          fnComponents.push(node);
        }
      },
      FunctionDeclaration: (node) => {
        if (isReactFunctionComponentDecl(node, jsCompatMode)) {
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
