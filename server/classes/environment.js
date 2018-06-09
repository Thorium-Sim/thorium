import uuid from "uuid";

export default class Environment {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.class = "Environment";
    this.oxygen = params.oxygen || 0.21;
    this.nitrogen = params.nitrogen || 0.78;
    this.trace = params.trace || 0.01;
    this.pressure = params.pressure || 14.7;
    this.temperature = params.temperature || 22.2;
    this.humidity = params.humidity || 0.45;
    this.gravity = params.gravity || 1;
  }
  update({
    oxygen,
    nitrogen,
    trace,
    pressure,
    temperature,
    humidity,
    gravity
  }) {
    if (oxygen || oxygen === 0) this.oxygen = oxygen;
    if (nitrogen || nitrogen === 0) this.nitrogen = nitrogen;
    if (trace || trace === 0) this.trace = trace;
    if (pressure || pressure === 0) this.pressure = pressure;
    if (temperature || temperature === 0) this.temperature = temperature;
    if (humidity || humidity === 0) this.humidity = humidity;
    if (gravity || gravity === 0) this.gravity = gravity;
  }
}
