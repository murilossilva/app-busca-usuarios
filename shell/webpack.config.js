const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "shell",
  remotes: {
    "mfe-success": "http://localhost:4201/remoteEntry.js",
    "mfe-register": "http://localhost:4202/remoteEntry.js",
  },
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
    "@ngrx/store": {
      singleton: true,
      strictVersion: false,
      requiredVersion: "auto",
    }
  },
});
