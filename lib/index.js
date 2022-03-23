/**
 * @fileoverview tbc
 * @author nossbigg
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

const makeRulesConfigReducer = (acc, ruleKey) => {
  const fullRuleName = `@nossbigg/clean-code-react/${ruleKey}`;
  return { ...acc, [fullRuleName]: "error" };
};
// import all rules in lib/rules
const allRules = requireIndex(__dirname + "/rules");

// default parser options
const parserOptions = {
  ecmaFeatures: {
    jsx: true,
  },
};

// configs
const allConfig = {
  rules: Object.keys(allRules).reduce(makeRulesConfigReducer, {}),
  parserOptions,
};

const recommendedConfig = {
  rules: Object.keys(allRules)
    .filter((ruleKey) => allRules[ruleKey].meta.docs.recommended)
    .reduce(makeRulesConfigReducer, {}),
  parserOptions,
};

module.exports = {
  rules: allRules,
  configs: { recommended: recommendedConfig, all: allConfig },
};
