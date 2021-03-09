export const BabelTC39Config = {
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        decoratorsBeforeExport: true,
        // legacy: false -- This is default config as of Babel 7.0.0 https://babeljs.io/blog/2018/09/17/decorators#syntax
      }
    ],
    "@babel/plugin-proposal-class-properties"
  ]
}