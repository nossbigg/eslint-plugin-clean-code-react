/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

const traverse = require("eslint-traverse");
const { isHook } = require("../common/react-hook-utils");
const { getRuleSetting } = require("../common/shared-options-utils");
const {
  isReactFunctionComponent,
  isReactFunctionComponentDecl,
} = require("../common/react-utils");
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
        "React Function Component does not use more than max React Hooks.",
      category: "fn-component",
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

    const jsCompatMode = getRuleSetting.jsCompatMode(context);

    const MAX_HOOKS_DEFAULT = 5;
    const maxHooks = getConfigOption(context, "maxHooks", MAX_HOOKS_DEFAULT);

    const fnComponents = [];

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

        fnComponents.forEach(handleNode);
      },
    };
  },
};
