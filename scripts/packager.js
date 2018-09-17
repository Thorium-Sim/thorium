const packager = require("electron-packager");

packager({
  dir: "./build",
  all: true,
  appCopyright: `Copyright ${new Date().getFullYear()} Fyreworks LLC.`,
  name: "Thorium",
  icon: "./server/icon",
  out: "./packages",
  overwrite: true,
  quiet: true,

  //Mac App
  appCategoryType: "public.app-category.entertainment",
  appBundleId: "us.fyreworks.thorium"
});
