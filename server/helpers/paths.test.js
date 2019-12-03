const paths = require("./paths");

test("paths", () => {
  expect(paths.userData).toContain("Documents/thorium");
});
