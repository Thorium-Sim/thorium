import uniqid from "@thorium/uniqid";

export class Timer {
  id: string = uniqid("timer-");
  label: string = "Generic";
  time: string = "00:05:00";
  paused: boolean = false;
  constructor(params: Partial<Timer>) {
    this.id = params.id || this.id;
    this.label = params.label || this.label;
    this.time = params.time || this.time;
    this.paused = params.paused || this.paused;
  }
}
