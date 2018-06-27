import manageTranslations from "react-intl-translations-manager";
import * as fs from "fs";
import { sync as globSync } from "glob";
import { sync as mkdirpSync } from "mkdirp";

const filePattern = "./src/translations/**/*.json";
const outputDir = "./src/locales/";

const languages = require("../package.json").languages;

manageTranslations({
  messagesDirectory: "src/translations",
  translationsDirectory: "src/locales",
  singleMessagesFile: true,
  languages // any language you need
});
