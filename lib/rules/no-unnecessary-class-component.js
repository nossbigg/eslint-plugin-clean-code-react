/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

const _ = require("lodash");
const { isReactClassComponent } = require("../common/react-utils");

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
      description: "Ensures that unnecessary class components are not allowed.",
      category: "class-component",
      recommended: true,
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

    const targetMethods = ["componentDidCatch", "getDerivedStateFromError"];
    const targetMethodsSet = new Set(targetMethods);

    return {
      ClassDeclaration: (node) => {
        if (!isReactClassComponent(node)) {
          return;
        }

        const bodyNodes = _.get(node, "body.body", []);
        const methodDefinitions = bodyNodes.filter(
          (b) => b.type === "MethodDefinition"
        );

        const targetMethods = methodDefinitions.filter((b) =>
          targetMethodsSet.has(b.key.name)
        );
        const isUnnecessaryClassComponent = targetMethods.length === 0;
        if (!isUnnecessaryClassComponent) {
          return;
        }

        context.report({
          node,
          message:
            "Unnecessary class component; Consider refactoring to function component.",
        });
      },
    };
  },
};
