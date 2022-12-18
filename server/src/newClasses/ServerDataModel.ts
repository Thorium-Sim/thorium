import {FSDataStore, FSDataStoreOptions} from "@thorium/db-fs";

export class ServerDataModel extends FSDataStore {
  clients!: Record<string, unknown>; //ServerClient>;
  thoriumId!: string;
  activeFlightName!: string | null;
  spaceEdventuresToken: string | null = null;
  googleSheetsTokens: any = {};
  // constructor(params: Partial<ServerDataModel>, options: FSDataStoreOptions) {
  //   super(params, options);
  //   if (this.clients) {
  //     this.clients = Object.fromEntries(
  //       Object.entries(this.clients).map(([id, client]) => [
  //         id,
  //         new ServerClient(client),
  //       ]),
  //     );
  //   } else {
  //     this.clients = Object.fromEntries(
  //       Object.entries(params.clients || {}).map(([id, client]) => [
  //         id,
  //         new ServerClient(client),
  //       ]),
  //     );
  //   }
  // }
}
