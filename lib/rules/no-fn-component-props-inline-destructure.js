/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

const { getRuleSetting } = require("../common/shared-options-utils");
const {
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
      description: "No function component props inline destructure.",
      category: "fn-component",
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    const jsCompatMode = getRuleSetting.jsCompatMode(context);
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
          const { params } = node;
          const [propsParam] = params;
          if (!propsParam) {
            return;
          }

          if (propsParam.type === "ObjectPattern") {
            context.report({
              node: propsParam,
              message:
                "Function component props inline destructure not allowed.",
            });
          }
        };

        fnComponents.forEach(handleNode);
      },
    };
  },
};
