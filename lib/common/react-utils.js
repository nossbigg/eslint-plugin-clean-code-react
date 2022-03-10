const _ = require("lodash");

// function component
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

const isReactFunctionComponent = (node) => {
  const parent = node.parent;
  if (parent.type !== "VariableDeclarator") {
    return false;
  }

  const typeAnnotation = _.get(parent, "id.typeAnnotation.typeAnnotation");
  if (!typeAnnotation) {
    return false;
  }

  const typeParts = getTSTypeReference(typeAnnotation.typeName);
  const typeString = typeParts.join(".");
  const result = fcTypeAllShorthandsSet.has(typeString);
  return result;
};

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

// class component
const classTypeShorthands = ["Component", "PureComponent"];
const classTypeShorthandsWithReact = classTypeShorthands.map(
  (s) => `React.${s}`
);
const classTypeAllShorthands = [
  ...classTypeShorthands,
  ...classTypeShorthandsWithReact,
];
const classTypeAllShorthandsSet = new Set(classTypeAllShorthands);

const isReactClassComponent = (node) => {
  if (!node.superClass) {
    return false;
  }

  const typeParts = getClassTypeReference(node.superClass);
  const typeString = typeParts.join(".");
  return classTypeAllShorthandsSet.has(typeString);
};

const getClassTypeReference = (node) => {
  if (node.type === "Identifier") {
    return [node.name];
  }
  if (node.type === "MemberExpression") {
    return [
      ...getClassTypeReference(node.object),
      ...getClassTypeReference(node.property),
    ];
  }
  return [];
};

// jsx
const getJSXElementName = (node) => {
  if (node.type === "JSXIdentifier") {
    return [node.name];
  }
  if (node.type === "JSXMemberExpression") {
    return [
      ...getJSXElementName(node.object),
      ...getJSXElementName(node.property),
    ];
  }
  return [];
};

exports.fcTypeAllShorthands = fcTypeAllShorthands;
exports.isReactFunctionComponentType = isReactFunctionComponentType;
exports.addIfReactFunctionComponentType = addIfReactFunctionComponentType;
exports.isReactClassComponent = isReactClassComponent;
exports.isReactFunctionComponent = isReactFunctionComponent;
exports.getJSXElementName = getJSXElementName;
