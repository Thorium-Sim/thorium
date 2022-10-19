import uuid from "uuid";
import {File} from "./";
export class HackingPreset {
  id: string;
  name: string;
  logs: boolean;
  longRange: boolean;
  longRangeMessages: {id: string; title: string; message: string}[];
  remoteControl: boolean;
  commandLines: string[];
  fileViewer: boolean;
  files: File[];
  constructor(params: Partial<HackingPreset> = {}) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "Hacking Preset";
    this.logs = params.logs ?? true;
    this.longRange = params.longRange ?? true;
    this.longRangeMessages = params.longRangeMessages || [];
    this.remoteControl = params.remoteControl ?? true;
    this.commandLines = params.commandLines ?? [];
    this.fileViewer = params.fileViewer ?? true;
    this.files = [];
    params.files?.forEach(file => this.files.push(new File(file)));
  }
}
