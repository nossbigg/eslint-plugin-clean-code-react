const fcTypeShorthands = [
  "FunctionComponent",
  "FC",
  "StatelessComponent",
  "SFC",
  "VoidFunctionComponent",
  "VFC",
];
const fcTypeShorthandsWithReact = fcTypeShorthands.map((s) => `React.${s}`);
const fcTypeAllShorthands = [...fcTypeShorthands, ...fcTypeShorthandsWithReact];
const fcTypeAllShorthandsSet = new Set(fcTypeAllShorthands);

const isReactFunctionComponentType = (node) => {
  const typeParts = getTSTypeReference(node.typeName);
  const typeString = typeParts.join(".");
  return fcTypeAllShorthandsSet.has(typeString);
};

const addIfReactFunctionComponentType = (arr, node) => {
  if (isReactFunctionComponentType(node)) {
    arr.push(node.parent.parent.parent.parent);
  }
};

const getTSTypeReference = (node) => {
  if (node.type === "Identifier") {
    return [node.name];
  }
  if (node.type === "TSQualifiedName") {
    return [
      ...getTSTypeReference(node.left),
      ...getTSTypeReference(node.right),
    ];
  }
  return [];
};

exports.fcTypeAllShorthands = fcTypeAllShorthands;
exports.isReactFunctionComponentType = isReactFunctionComponentType;
exports.addIfReactFunctionComponentType = addIfReactFunctionComponentType;
