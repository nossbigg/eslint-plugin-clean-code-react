const assert = require("assert");
const { fcTypeAllShorthands } = require("../../../lib/common/react-utils");

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
});
