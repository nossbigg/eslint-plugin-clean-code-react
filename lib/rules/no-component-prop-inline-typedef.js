/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

const traverse = require("eslint-traverse");
const _ = require("lodash");
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
        "Ensures that React Component typedefs do not contain inline typedefs.",
      category: "component",
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

    const handlePropParams = (propParams) => {
      propParams.forEach((propParam) => {
        traverse(context, propParam, (path) => {
          if (path.node.type !== "TSTypeLiteral") {
            return;
          }

          context.report({
            node: path.node,
            message: "Inline typedef for React Component not allowed.",
          });
        });
      });
    };

    return {
      TSTypeReference: (node) => {
        if (!isReactFunctionComponentType(node)) {
          return;
        }

        const propParams = _.get(node, "typeParameters.params", []);
        handlePropParams(propParams);
      },
      ClassDeclaration: (node) => {
        if (!isReactClassComponentType(node)) {
          return;
        }

        const propParams = _.get(node, "superTypeParameters.params", []);
        handlePropParams(propParams);
      },
    };
  },
};
