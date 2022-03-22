const assert = require("assert");
const {
  fcTypeAllShorthands,
  classTypeAllShorthands,
} = require("../../../lib/common/react-utils");

describe("react-utils", () => {
  describe("fcTypeAllShorthands", () => {
    it("matches snapshot", () => {
      const expectedResult = [
        "FunctionComponent",
        "FC",
        "StatelessComponent",
        "SFC",
        "VoidFunctionComponent",
        "VFC",
        "React.FunctionComponent",
        "React.FC",
        "React.StatelessComponent",
        "React.SFC",
        "React.VoidFunctionComponent",
        "React.VFC",
      ];
      assert.deepEqual(fcTypeAllShorthands, expectedResult);
    });
  });

  describe("classTypeAllShorthands", () => {
    it("matches snapshot", () => {
      const expectedResult = [
        "Component",
        "PureComponent",
        "React.Component",
        "React.PureComponent",
      ];
      assert.deepEqual(classTypeAllShorthands, expectedResult);
    });
  });
});
