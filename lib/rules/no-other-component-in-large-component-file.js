/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

const _ = require("lodash");
const { getRuleSetting } = require("../common/shared-options-utils");
const { isLargeComponent } = require("../common/ast-utils");
const {
  isReactFunctionComponent,
  isReactClassComponent,
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
        "No other components exist in the same file when a large component exists.",
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

    const components = [];

    const jsCompatMode = getRuleSetting.jsCompatMode(context);
    const largeComponentLength = getRuleSetting.largeComponentLength(context);

    const raiseLintError = (node) => {
      context.report({
        node,
        message: "No other component in large component file.",
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
      "Program:exit": () => {
        const largeComponents = components.filter(
          isLargeComponent(largeComponentLength)
        );
        const hasLargeComponents = largeComponents.length > 0;
        if (!hasLargeComponents) {
          return;
        }

        // don't raise lint error for first large component
        const [, ...otherLargeComponents] = largeComponents;
        const nonLargeComponents = components.filter(
          _.negate(isLargeComponent(largeComponentLength))
        );

        otherLargeComponents.forEach(raiseLintError);
        nonLargeComponents.forEach(raiseLintError);
      },
    };
  },
};
