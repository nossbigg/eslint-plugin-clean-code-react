/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

const traverse = require("eslint-traverse");
const { isHook } = require("../common/react-hook-utils");
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
      description: "Custom React Hooks do not use more than max hooks.",
      category: "hooks",
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: "object",
        properties: {
          maxHooks: {
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

    const maxHooks = getConfigOption(context, "maxHooks", 5);

    const hookDeclarations = [];

    const handleHookDeclaration = (node) => {
      let numberOfHooks = 0;
      traverse(context, node, (path) => {
        if (
          path.node.type === "Identifier" &&
          path.node.parent.type === "VariableDeclarator"
        ) {
          return;
        }

        if (
          path.node.type === "Identifier" &&
          path.node.parent.type === "FunctionDeclaration"
        ) {
          return;
        }

        if (isHook(path.node)) {
          numberOfHooks++;
        }
      });

      if (numberOfHooks > maxHooks) {
        context.report({
          node,
          message: "Too many hooks in custom hook.",
        });
      }
    };

    return {
      ArrowFunctionExpression: (node) => {
        const { parent } = node;
        if (parent.type !== "VariableDeclarator") {
          return;
        }

        if (!isHook(parent.id)) {
          return;
        }

        hookDeclarations.push(parent);
      },
      FunctionDeclaration: (node) => {
        if (!isHook(node.id)) {
          return;
        }
        hookDeclarations.push(node);
      },
      "Program:exit": () => {
        hookDeclarations.forEach(handleHookDeclaration);
      },
    };
  },
};
