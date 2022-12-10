import {FSDataStore, FSDataStoreOptions} from "@thorium/db-fs";
import {ServerClient} from "./ServerClient";

export class ServerDataModel extends FSDataStore {
  clients!: Record<string, ServerClient>;
  thoriumId!: string;
  activeFlightName!: string | null;
  constructor(params: Partial<ServerDataModel>, options: FSDataStoreOptions) {
    super(params, options);
    if (this.clients) {
      this.clients = Object.fromEntries(
        Object.entries(this.clients).map(([id, client]) => [
          id,
          new ServerClient(client),
        ]),
      );
    } else {
      this.clients = Object.fromEntries(
        Object.entries(params.clients || {}).map(([id, client]) => [
          id,
          new ServerClient(client),
        ]),
      );
    }
  }
}
