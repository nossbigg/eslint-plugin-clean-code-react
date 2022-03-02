exports.getRuleTesterConfig = () => {
  const config = {
    parser: require.resolve("@typescript-eslint/parser"),
    parserOptions: {
      ecmaVersion: 2015,
      ecmaFeatures: { jsx: true },
      sourceType: "module",
    },
  };
  return config;
};
