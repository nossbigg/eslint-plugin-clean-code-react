/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

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
      description: "Component prop typedef does not exceed max properties.",
      category: "typedef",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: "object",
        properties: {
          maxProps: {
            type: "number",
          },
        },
        additionalProperties: false,
      },
    ], // Add a schema if the rule has options
  },

  create(context) {
    const MAX_PROPS_DEFAULT = 7;
    const maxProps = getConfigOption(context, "maxProps", MAX_PROPS_DEFAULT);

    const propsTypedefs = [];

    const handlePropsTypedef = (node) => {
      if (node.typeAnnotation.type !== "TSTypeLiteral") {
        return;
      }

      const { members } = node.typeAnnotation;
      const exceedsMaxProps = members.length > maxProps;
      if (!exceedsMaxProps) {
        return;
      }

      context.report({
        node,
        message: "Component prop typedef exceeds max properties.",
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
