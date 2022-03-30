const { getRuleSettings, getConfigOption } = require("./config-utils");

// jsCompatMode
const getJsCompatMode = (key, defaultValue) => (context) => {
  const settingValue = getRuleSettings(context, key);
  if (settingValue !== undefined) {
    return settingValue;
  }

  return defaultValue;
};

// largeComponentLength
const LARGE_COMPONENT_LENGTH_DEFAULT = 50;
const getFinalOptionValue = (key, defaultValue) => (context) => {
  const ruleOptionValue = getConfigOption(context, key);
  if (ruleOptionValue !== undefined) {
    return ruleOptionValue;
  }

  const settingValue = getRuleSettings(context, key);
  if (settingValue !== undefined) {
    return settingValue;
  }

  return defaultValue;
};

const getRuleSetting = {
  jsCompatMode: getJsCompatMode("jsCompatMode", false),
  largeComponentLength: getFinalOptionValue(
    "largeComponentLength",
    LARGE_COMPONENT_LENGTH_DEFAULT
  ),
};

exports.getRuleSetting = getRuleSetting;
