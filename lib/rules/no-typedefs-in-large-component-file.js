/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

const { getConfigOption } = require("../common/config-utils");
const { isLargeComponent } = require("../common/ast-utils");
const { getRuleSetting } = require("../common/shared-options-utils");
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
        "Typedefs are not declared in the same file when a large component exists.",
      category: "component",
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: "object",
        properties: {
          largeComponentLength: {
            type: "number",
          },
          excludePropsTypedefs: {
            type: "boolean",
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

    const typedefs = [];

    const components = [];

    const jsCompatMode = getRuleSetting.jsCompatMode(context);
    const largeComponentLength = getRuleSetting.largeComponentLength(context);
    const excludePropsTypedefs = getConfigOption(
      context,
      "excludePropsTypedefs",
      true
    );

    const isNotPropsTypedef = (node) => {
      const result = !node.id.name.includes("Props");
      return result;
    };

    const raiseLintError = (node) => {
      context.report({
        node,
        message: "No typedefs in large component file.",
      });
    };

    return {
      ArrowFunctionExpression: (node) => {
        if (isReactFunctionComponent(node, jsCompatMode)) {
          components.push(node);
        }
      },
      FunctionExpression: (node) => {
        if (isReactFunctionComponent(node, jsCompatMode)) {
          components.push(node);
        }
      },
      FunctionDeclaration: (node) => {
        if (isReactFunctionComponentDecl(node, jsCompatMode)) {
          components.push(node);
        }
      },
      ClassDeclaration: (node) => {
        if (!isReactClassComponent(node)) {
          return;
        }
        components.push(node);
      },
      TSTypeAliasDeclaration: (node) => {
        if (node.id.type !== "Identifier") {
          return;
        }
        typedefs.push(node);
      },
      "Program:exit": () => {
        const largeComponents = components.filter(
          isLargeComponent(largeComponentLength)
        );
        const hasLargeComponents = largeComponents.length > 0;
        if (!hasLargeComponents) {
          return;
        }

        const filteredTypedefs = !excludePropsTypedefs
          ? typedefs
          : typedefs.filter(isNotPropsTypedef);

        filteredTypedefs.forEach(raiseLintError);
      },
    };
  },
};
