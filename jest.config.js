/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testPathIgnorePatterns: ["/node_modules/", "./public/"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!react-leaflet|d3-array|internmap|delaunator|robust-predicates)",
  ],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(scss|css|sass)": "identity-obj-proxy",
  },
};
