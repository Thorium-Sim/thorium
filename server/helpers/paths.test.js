import paths from './paths';

test("paths", () => {
  expect(paths.userData).toContain("Documents/thorium");
});
