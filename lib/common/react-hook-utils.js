// source: https://github.com/facebook/react/blob/0c0d1ddae4be922f800705ae686fbb887184b38b/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js

function isHookName(s) {
  return /^use[A-Z0-9].*$/.test(s);
}

function isHook(node) {
  if (node.type === "Identifier") {
    return isHookName(node.name);
  } else if (
    node.type === "MemberExpression" &&
    !node.computed &&
    isHook(node.property)
  ) {
    const obj = node.object;
    const isPascalCaseNameSpace = /^[A-Z].*/;
    return obj.type === "Identifier" && isPascalCaseNameSpace.test(obj.name);
  } else {
    return false;
  }
}

exports.isHook = isHook;
