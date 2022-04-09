/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";
const traverse = require("eslint-traverse");

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
        "Component prop typedef does not contain nested type literal.",
      category: "typedef",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
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

    const propsTypedefs = [];

    const handlePropsTypedef = (node) => {
      const rootTypedef = node.typeAnnotation;

      traverse(context, node, (path) => {
        if (path.node.type !== "TSTypeLiteral") {
          return;
        }

        const isRootTypeLiteral = path.node === rootTypedef;
        if (isRootTypeLiteral) {
          return;
        }

        context.report({
          node: path.node,
          message: "No nested type literal in component prop typedef.",
        });
      });
    };

    return {
      TSTypeLiteral: (node) => {
        if (node.parent.type !== "TSTypeAliasDeclaration") {
          return;
        }

        const isContainsProps = node.parent.id.name.includes("Props");
        if (!isContainsProps) {
          return;
        }

        propsTypedefs.push(node.parent);
      },
      "Program:exit": () => {
        propsTypedefs.forEach(handlePropsTypedef);
      },
    };
  },
};
