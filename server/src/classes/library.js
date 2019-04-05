import uuid from "uuid";
import { paramCase } from "change-case";
export default class Library {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Library";
    this.simulatorId = params.simulatorId || null;
    this.title = params.title || "Entry";
    this.slug = paramCase(this.title);
    this.body = params.body || "This is an entry";
    this.image = params.image || "";
    this.type = params.type || "general";
    this.categories = params.categories || [];
    this.seeAlso = params.seeAlso || [];
  }
  update({ title, type, body, image, categories, seeAlso }) {
    if (title) {
      this.title = title;
      this.slug = paramCase(this.title);
    }
    if (type) this.type = type;
    if (body) this.body = body;
    if (image) this.image = image;
    if (categories) this.categories = categories;
    if (seeAlso) this.seeAlso = seeAlso;
  }
}
