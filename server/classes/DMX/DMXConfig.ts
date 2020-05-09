import uuid from "uuid";
import {ChannelConfig} from "./DMXFixture";
import App from "../../app";

type DMXAlertConfig = {[tag: string]: ChannelConfig};
type DMXConfigStuff = {
  "1"?: DMXAlertConfig;
  "2"?: DMXAlertConfig;
  "3"?: DMXAlertConfig;
  "4"?: DMXAlertConfig;
  "5"?: DMXAlertConfig;
  p?: DMXAlertConfig;
  darken?: DMXAlertConfig;
};

class DMXConfig {
  static exportable = "dmxConfigs";
  class: "DMXConfig" = "DMXConfig";
  id: string;
  name: string;
  config: DMXConfigStuff;
  actionStrength: number;
  constructor(params: Partial<DMXConfig> = {}) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "DMX Config";
    this.config = params.config || {};
    this.actionStrength = params.actionStrength ?? 1;
  }
  serialize({addData}) {
    const filename = `${this.name}.dmxConfig`;
    addData("dmxConfigs", this);
    return filename;
  }
  static import(data: DMXConfig) {
    const config = new DMXConfig({...data, id: null});
    App.dmxConfigs.push(config);
  }
  setName(name: string) {
    this.name = name;
  }
  setConfig(config: DMXConfigStuff) {
    this.config = config;
  }
  setActionStrength(strength: number) {
    this.actionStrength = strength;
  }
}

export default DMXConfig;
