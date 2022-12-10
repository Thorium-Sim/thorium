import {Process} from "@server/newClasses/Process";

class TimerProcess extends Process {
  update(elapsedMs: number): void {
    // Yay!
  }
}
const processes = [TimerProcess];
export default processes;
