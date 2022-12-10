import randomWords from "@thorium/random-words";
import {ServerDataModel} from "./ServerDataModel";
import processes from "../newProcesses";
import {FlightClient} from "./FlightClient";
import {FSDataStore, FSDataStoreOptions} from "@thorium/db-fs";
import {Process} from "./Process";
import {Timer} from "./Timer";

export class FlightDataModel extends FSDataStore {
  static INTERVAL = 1000 / 60;
  name!: string;
  date!: number;
  paused!: boolean;
  clients!: Record<string, FlightClient>;
  serverDataModel: ServerDataModel;

  /**
   * Count how many updates have been done.
   */
  updateCounter = 0;
  lastUpdate = performance.now();
  interval!: ReturnType<typeof setInterval>;
  processes: Process[] = processes.map(ProcessClass => new ProcessClass());

  timers: Timer[] = [];

  constructor(
    params: Partial<FlightDataModel> & {
      serverDataModel: ServerDataModel;
      initialLoad?: boolean;
    },
    storeOptions: FSDataStoreOptions = {},
  ) {
    const flightName = params.name || randomWords(3).join("-");

    super(
      {
        name: flightName,
        paused: false,
        date: Number(params.date ? new Date(params.date) : new Date()),
      },
      storeOptions,
    );
    this.name ??= flightName;
    this.paused ??= params.paused ?? true;
    this.date ??= Number(params.date ? new Date(params.date) : new Date());
    this.serverDataModel = params.serverDataModel;

    this.clients = Object.fromEntries(
      Object.entries(this.clients || params.clients || {}).map(
        ([id, client]) => [id, new FlightClient(client)],
      ),
    );
  }
  init = () => {
    if (this.interval) return;
    this.run();
  };
  run = () => {
    // Run all the systems
    if (!this.paused) {
      this.update();
    }
    if (process.env.NODE_ENV === "test") return;
    this.interval = setTimeout(this.run, FlightDataModel.INTERVAL);
  };
  destroy() {
    clearInterval(this.interval);
  }
  update(testElapsed?: number) {
    let now = performance.now();
    let elapsed = testElapsed ?? now - this.lastUpdate;
    for (let process of this.processes) {
      if (this.updateCounter % process.frequency > 0) {
        continue;
      }

      process.update(elapsed);
    }
    this.updateCounter += 1;
    this.lastUpdate = now;
  }
  reset() {
    // TODO: Flight Reset Handling
  }
}
