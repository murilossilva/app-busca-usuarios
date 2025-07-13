const { pathsToModuleNameMapper } = require("ts-jest");
const fs = require("fs");
const tsconfig = JSON.parse(fs.readFileSync("./tsconfig.json", "utf8"));

module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.js"],
  transform: {
    "^.+\\.(ts|mjs|html)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
        stringifyContentPathRegex: "\\.html$",
        useESM: true,
      },
    ],
  },
  moduleNameMapper: pathsToModuleNameMapper(
    tsconfig.compilerOptions.paths || {},
    {
      prefix: "<rootDir>/",
    }
  ),
  testEnvironment: "jsdom",
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  moduleFileExtensions: ["ts", "html", "js", "json"],
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.module.ts", // ignora todos os arquivos *.module.ts
    "!src/**/main.ts", // ignora o main.ts
    "!src/**/main.js", // ignora o main.js (caso exista)
    "!src/**/bootstrap.ts", // ignora bootstrap.ts
    "!src/environments/**", // ignora arquivos de ambiente
  ],
};
