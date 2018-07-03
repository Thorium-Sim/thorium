const App = require("../app").default;
const defaultSnapshot = require("./defaultSnapshot").default;

describe("defaultSnapshot", () => {
  const keyWhitelist = ["domain", "_events", "_maxListeners"];
  const appKeys = Object.keys(App).filter(a => keyWhitelist.indexOf(a) === -1);
  const defaultSnapshotKeys = Object.keys(defaultSnapshot);
  // Every app key is referenced in the default snapshot keys
  test.each(appKeys)("default snapshot for %s", key =>
    expect(defaultSnapshotKeys.indexOf(key)).toBeGreaterThan(-1)
  );
});
