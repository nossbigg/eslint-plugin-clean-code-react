const getNodeLines = (node) => {
  const { start, end } = node.loc;
  return end.line - start.line + 1;
};

exports.getNodeLines = getNodeLines;
