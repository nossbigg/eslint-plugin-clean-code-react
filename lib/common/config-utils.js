const _ = require("lodash");

const getConfigOption = (context, key, defaultValue) => {
  const value = _.get(context, "options[0]." + key, defaultValue);
  return value;
};

exports.getConfigOption = getConfigOption;
