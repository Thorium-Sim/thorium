import uuid from "uuid";
import {ChannelConfig} from "./DMXFixture";

type DMXAlertConfig = {[tag: string]: ChannelConfig};
type DMXConfigStuff = {
  "1"?: DMXAlertConfig;
  "2"?: DMXAlertConfig;
  "3"?: DMXAlertConfig;
  "4"?: DMXAlertConfig;
  "5"?: DMXAlertConfig;
  p?: DMXAlertConfig;
};

class DMXConfig {
  class: "DMXConfig" = "DMXConfig";
  id: string;
  name: string;
  config: DMXConfigStuff;
  constructor(params: Partial<DMXConfig> = {}) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "DMX Config";
    this.config = params.config || {};
  }
  setName(name: string) {
    this.name = name;
  }
  setConfig(config: DMXConfigStuff) {
    this.config = config;
  }
}

export default DMXConfig;
