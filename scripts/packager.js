const packager = require("electron-packager");

packager({
  dir: "./build",
  platform: "darwin,win32,linux",
  appCopyright: `Copyright ${new Date().getFullYear()} Fyreworks LLC.`,
  name: "Thorium",
  icon: "./server/icon",
  out: "./packages",
  overwrite: true,
  quiet: false,

  //Mac App
  appCategoryType: "public.app-category.entertainment",
  appBundleId: "us.fyreworks.thorium",
  osxSign: {
    entitlements: "./entitlements.mac.plist"
  }
});
