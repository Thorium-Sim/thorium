const schema = require("./index").default;
test("schema", () => {
  expect(typeof schema).toEqual("string");
});
