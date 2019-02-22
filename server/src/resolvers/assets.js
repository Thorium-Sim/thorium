import fs from "fs";
import path from "path";
import App from "../app";
import os from "os";
import { pubsub } from "../helpers/subscriptionManager.js";
import paths from "../helpers/paths";
import { ncp } from "ncp";
import { download } from "../bootstrap/init";
import uuid from "uuid";

let assetDir = path.resolve("./assets/");

if (process.env.NODE_ENV === "production") {
  assetDir = paths.userData + "/assets";
}

export const AssetsQueries = {};

export const AssetsMutations = {};

export const AssetsSubscriptions = {};

export const AssetsTypes = {};
