/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

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
      description: "Ensures React Component typedef name contains 'Props'.",
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

    const handlePropParam = (propParam) => {
      if (!propParam) {
        return;
      }

      if (propParam.typeName.type !== "Identifier") {
        return;
      }

      const isContainsProps = propParam.typeName.name.includes("Props");
      if (isContainsProps) {
        return;
      }

      context.report({
        node: propParam,
        message: "React Component props typedef name does not contain 'Props'.",
      });
    };

    return {
      TSTypeReference: (node) => {
        if (!isReactFunctionComponentType(node)) {
          return;
        }

        const propParam = _.get(node, "typeParameters.params[0]");
        handlePropParam(propParam);
      },
      ClassDeclaration: (node) => {
        if (!isReactClassComponentType(node)) {
          return;
        }

        const propParam = _.get(node, "superTypeParameters.params[0]");
        handlePropParam(propParam);
      },
    };
  },
};
