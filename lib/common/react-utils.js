const fcTypeShorthands = [
  "FunctionComponent",
  "FC",
  "StatelessComponent",
  "SFC",
  "VoidFunctionComponent",
  "VFC",
];
const fcTypeShorthandsWithReact = fcTypeShorthands.map((s) => `React.${s}`);
const allShorthands = [...fcTypeShorthands, ...fcTypeShorthandsWithReact];
const allShorthandsSet = new Set(allShorthands);

const isReactFunctionComponentType = (sourceCode, node) => {
  const typeSigString = sourceCode.getText(node);
  return allShorthandsSet.has(typeSigString);
};

const addIfReactFunctionComponentType = (sourceCode, arr, node) => {
  if (isReactFunctionComponentType(sourceCode, node)) {
    arr.push(node.parent.parent.parent.parent);
  }
};

exports.isReactFunctionComponentType = isReactFunctionComponentType;
exports.addIfReactFunctionComponentType = addIfReactFunctionComponentType;
