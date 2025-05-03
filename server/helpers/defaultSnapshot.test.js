import App from '../app'
import {getDefaultSnapshot} from './defaultSnapshot'

describe("defaultSnapshot", () => {
  const defaultSnapshot = getDefaultSnapshot()
  const keyWhitelist = [
    "domain",
    "_events",
    "_maxListeners",
    "mutations",
    "setMutations",
    "firebaseManager",
  ];
  const appKeys = Object.keys(App).filter(a => keyWhitelist.indexOf(a) === -1);
  const defaultSnapshotKeys = Object.keys(defaultSnapshot);
  // Every app key is referenced in the default snapshot keys
  test.each(appKeys)("default snapshot for %s", key =>
    expect(defaultSnapshotKeys.indexOf(key)).toBeGreaterThan(-1),
  );
});
