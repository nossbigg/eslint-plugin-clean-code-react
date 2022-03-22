const getNodeLines = (node) => {
  const { start, end } = node.loc;
  return end.line - start.line + 1;
};

const isLargeComponent = (largeComponentLength) => (node) => {
  const nodeLines = getNodeLines(node);
  return nodeLines > largeComponentLength;
};

exports.getNodeLines = getNodeLines;
exports.isLargeComponent = isLargeComponent;
