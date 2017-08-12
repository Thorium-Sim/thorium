const Db = require("tingodb")().Db;
export const db = new Db("./database/", {});
export var collections = {
  events: db.collection("events"),
  snapshots: db.collection("snapshots")
};
