/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

const traverse = require("eslint-traverse");
const { isHook } = require("../common/react-hook-utils");
const { addIfReactFunctionComponentType } = require("../common/react-utils");

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
        "Ensures that React Function Component does not use more than max React Hooks.",
      category: "fn-component",
      recommended: false,
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

    const MAX_HOOKS_DEFAULT = 5;
    const getMaxHooks = () => {
      const [config] = context.options;
      if (!config) {
        return MAX_HOOKS_DEFAULT;
      }

      return config.maxHooks;
    };
    const maxHooks = getMaxHooks();

    const sourceCode = context.getSourceCode();
    const fcComponents = [];

    return {
      TSTypeReference: (node) => {
        addIfReactFunctionComponentType(sourceCode, fcComponents, node);
      },
      "Program:exit": () => {
        const handleNode = (node) => {
          let numberOfHooks = 0;
          traverse(context, node, (path) => {
            if (isHook(path.node)) {
              numberOfHooks++;
            }
          });

          if (numberOfHooks > maxHooks) {
            context.report({
              node,
              message: "Too many hooks in React component.",
            });
          }
        };

        fcComponents.forEach(handleNode);
      },
    };
  },
};
