const config = {
  set: { packages: ["typescript@4.0.5", "@typescript-eslint/parser@5.0.0"] },
  unset: {
    packages: ["typescript", "@typescript-eslint/parser"],
  },
};

module.exports = config;
