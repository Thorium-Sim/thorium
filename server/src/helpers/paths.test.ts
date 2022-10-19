const paths = require("./paths").default;

test("paths", () => {
  expect(paths.userData).toContain("Documents/thorium");
});
