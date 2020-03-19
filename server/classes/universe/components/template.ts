import {registerComponent} from "../component";
import {immerable} from "immer";

// This is for template entities, not a template to duplicate.
// But if you want to duplicate it, be my guest.
export class Template {
  [immerable] = true;
  static class = "Template";
  class = "Template";
  category: string;
  constructor({category}) {
    this.category = category;
  }
}

registerComponent(Template);
