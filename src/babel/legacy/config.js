export const BabelLegacyConfig = {
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        // decoratorsBeforeExport can't be used with legacy mode
        legacy: true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      // "When using the legacy: true mode, @babel/plugin-proposal-class-properties must be used in loose mode to support the @babel/plugin-proposal-decorators"
      // https://babeljs.io/docs/en/babel-plugin-proposal-decorators#legacy
      {
        loose: true
      }
    ]
  ]
}