module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  coverageReporters: ["html"],
};


// export default{
//   preset: "ts-jest",
//   testEnvironment: "node",
//   testMatch: ["**/**/*.test.ts"],
//   verbose: true,
//   forceExit: true,
//   clearMocks: true,
//   resetMocks: true,
//   restoreMocks: true,
//   coverageReporters: ["html"],
// };