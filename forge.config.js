const {FusesPlugin} = require("@electron-forge/plugin-fuses");
const {FuseV1Options, FuseVersion} = require("@electron/fuses");

const neededPackages = [
  "uuid",
  "@electron/get",
  "debug",
  "ms",
  "env-paths",
  "fs-extra",
  "at-least-node",
  "graceful-fs",
  "jsonfile",
  "universalify",
  "global-agent",
  "boolean",
  "es6-error",
  "matcher",
  "escape-string-regexp",
  "roarr",
  "detect-node",
  "globalthis",
  "define-properties",
  "define-data-property",
  "es-define-property",
  "get-intrinsic",
  "es-errors",
  "function-bind",
  "has-proto",
  "has-symbols",
  "hasown",
  "gopd",
  "has-property-descriptors",
  "object-keys",
  "json-stringify-safe",
  "semver-compare",
  "sprintf-js",
  "semver",
  "serialize-error",
  "type-fest",
  "got",
  "@sindresorhus/is",
  "@szmarczak/http-timer",
  "defer-to-connect",
  "cacheable-request",
  "clone-response",
  "mimic-response",
  "get-stream",
  "pump",
  "end-of-stream",
  "once",
  "wrappy",
  "http-cache-semantics",
  "keyv",
  "json-buffer",
  "lowercase-keys",
  "normalize-url",
  "responselike",
  "decompress-response",
  "duplexer3",
  "p-cancelable",
  "to-readable-stream",
  "url-parse-lax",
  "prepend-http",
  "progress",
  "sumchecker",
  "@types/node",
  "undici-types",
  "extract-zip",
  "@types/yauzl",
  "yauzl",
  "buffer-crc32",
  "fd-slicer",
  "pend",
  "bonjour",
  "array-flatten",
  "deep-equal",
  "is-arguments",
  "call-bind",
  "set-function-length",
  "has-tostringtag",
  "is-date-object",
  "is-regex",
  "object-is",
  "regexp.prototype.flags",
  "set-function-name",
  "functions-have-names",
  "dns-equal",
  "dns-txt",
  "buffer-indexof",
  "multicast-dns",
  "dns-packet",
  "ip",
  "safe-buffer",
  "thunky",
  "multicast-dns-service-types",
  "electron-is-dev",
  "electron-settings",
  "clone",
  "is-linux",
  "is-osx",
  "is-windows",
  "electron-updater",
  "@types/semver",
  "js-yaml",
  "argparse",
  "lazy-val",
  "lodash.escaperegexp",
  "lodash.isequal",
  "serialport",
  "@serialport/bindings-cpp",
  "@serialport/parser-byte-length",
  "@serialport/bindings-interface",
  "@serialport/parser-cctalk",
  "@serialport/parser-delimiter",
  "@serialport/parser-inter-byte-timeout",
  "@serialport/parser-packet-length",
  "@serialport/parser-readline",
  "@serialport/parser-ready",
  "@serialport/parser-regex",
  "@serialport/parser-slip-encoder",
  "@serialport/parser-spacepacket",
  "@serialport/stream",
  "@types/w3c-web-usb",
  "node-addon-api",
  "node-gyp-build",
  "e131",
  "sax",
  "es-object-atoms",
  "math-intrinsics",
  "get-proto",
  "dunder-proto",
  "call-bound",
];
module.exports = {
  packagerConfig: {
    asar: true,
    appBundleId: "com.thoriumsim.classic",
    executableName: "Thorium",
    name: "Thorium",
    icon: "./public/icon",
    ignore: path => {
      if (path.startsWith("/build")) return false;
      if (!path) return false;
      if (path.includes("package.json")) return false;
      if (path.startsWith("/node_modules")) {
        if (path === "/node_modules") return false;
        for (let i of neededPackages) {
          if (path.startsWith(`/node_modules/${i}`)) {
            return false;
          }
        }
        return true;
      }

      return true;
    },
    appCategoryType: "public.app-category.entertainment",
    osxSign: {
      optionsForFile: filePath => {
        // Here, we keep it simple and return a single entitlements.plist file.
        // You can use this callback to map different sets of entitlements
        // to specific files in your packaged app.
        return {
          entitlements: "./public/entitlements.mac.plist",
        };
      },
      hardenedRuntime: true,
    },
    osxNotarize: {
      appleApiKey: process.env.APPLE_API_KEY,
      appleApiKeyId: process.env.APPLE_API_KEY_ID,
      appleApiIssuer: process.env.APPLE_API_ISSUER,
    },
  },
  rebuildConfig: {
    force: true,
    onlyModules: ["@serialport/bindings-cpp", "serialport"],
    args: ["--runtime=electron", "--cache=/tmp/.electron-gyp"],
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "thorium-sim",
          name: "thorium",
        },
        prerelease: true,
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
