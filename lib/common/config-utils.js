const _ = require("lodash");

const RULE_SETTING_KEY = "@nossbigg/eslint-plugin-clean-code-react";

const getConfigOption = (context, key, defaultValue = undefined) => {
  const value = _.get(context, "options[0]." + key, defaultValue);
  return value;
};

const getRuleSettings = (context, key) => {
  const ruleSettings = _.get(context, `settings[${RULE_SETTING_KEY}]`);
  const value = _.get(ruleSettings, key);
  return value;
};

exports.getConfigOption = getConfigOption;
exports.getRuleSettings = getRuleSettings;
