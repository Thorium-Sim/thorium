import {DataContext} from "./DataContext";
// import {cardSubscriptions, cardDataStreams} from "client/src/utils/cardData";

import {encode} from "@msgpack/msgpack";
import {SocketStream} from "@fastify/websocket";
import requests, {AllRequestNames, cardSubscriptions} from "@server/requests";
import {randomNameGenerator} from "@server/newHelpers/randomNameGenerator";
import {SnapshotInterpolation} from "@thorium/snapshot-interpolation/src";
import {pubsub} from "@server/newHelpers/pubsub";

type NetRequestData = {
  requestName: AllRequestNames;
  params: any;
  requestId: string;
};

const sockets: Record<string, SocketStream> = {};
/**
 * A client is a single computer running a Station. To run Thorium,
 * you must have at least one client for every Station in the simulation
 * (except the Captain), but you could have multiple clients running the
 * same Station on larger bridges. Each crew member (except the Captain)
 * should have at least one client computer.
 */

function socketSend(socket: SocketStream, data: any) {
  try {
    socket.socket.send(encode(data));
  } catch (err) {
    console.error(err);
    console.error(data);
  }
}
export class ServerClient {
  id: string;
  name: string;
  connected: boolean;
  clientContext!: DataContext;
  dataStreamList: {
    [requestId: string]: {
      params: any;
      cardName: string;
    };
  } = {};
  SI = new SnapshotInterpolation();
  private _cards: (keyof typeof cardSubscriptions)[] | null = null;
  constructor(params: {id: string} & Partial<ServerClient>) {
    this.id = params.id;
    this.name = params.name || randomNameGenerator();
    // Host will always default to false, and will be set
    // to true when the host client connects to the server

    // The client starts disconnected since that's
    // how it will always be when the server starts up.
    this.connected = false;
  }
  public toJSON() {
    const {clientContext, SI, dataStreamList, _cards, connected, ...data} =
      this;
    return data;
  }
  public async initWebSocket(
    connection: SocketStream,
    database: Pick<DataContext, "server" | "flight">,
  ) {
    this.clientContext = new DataContext(this.id, database);

    sockets[this.id] = connection;
    await this.initRequests(connection);
  }
  private async initRequests(socket: SocketStream) {
    if (!socket)
      throw new Error(
        "NetSend cannot be initialized before the socket is established.",
      );
    const netRequestList: {
      [requestId: string]: {
        params: any;
        requestName: AllRequestNames;
        subscriptionId: number;
      };
    } = {};

    socket.socket.on("close", () => {
      this.connected = false;
      pubsub.publish("thorium");
      pubsub.publish("client", {clientId: this.id});
      for (let requestId in netRequestList) {
        pubsub.unsubscribe(netRequestList[requestId]?.subscriptionId);
      }
    });

    // Set up the whole netSend process for calling input functions
    socket.socket.on("message", async data => {
      try {
        const messageData = JSON.parse(data.toString());
        switch (messageData.type) {
          case "netRequest": {
            const {requestName, requestId} = messageData.data as NetRequestData;

            function handleNetRequestError(err: unknown) {
              if (err === null) return;
              let message = err;
              if (err instanceof Error) {
                message = err.message;
              }
              console.error(`Error in request ${requestName}: ${message}`);
              if (err instanceof Error) console.error(err.stack);
              socketSend(socket, {
                type: "netRequestData",
                data: {
                  requestId: requestId,
                  error: message,
                },
              });
              pubsub.unsubscribe(netRequestList[requestId]?.subscriptionId);
              delete netRequestList[requestId];
            }

            // If this client is already subscribed to this request, ignore the request.
            // It will already get the data it needs from the other request.
            if (netRequestList[requestId]) return;

            try {
              const requestFunction = requests[requestName];
              const params = messageData.data.params || {};

              // Create the subscription
              async function handleRequest(payload: any, context: DataContext) {
                try {
                  const data = await requestFunction(context, params, payload);

                  socketSend(socket, {
                    type: "netRequestData",
                    data: {
                      requestId: requestId,
                      response: data,
                    },
                  });
                  return data as any;
                } catch (err) {
                  handleNetRequestError(err);
                }
              }
              const subscriptionId = await pubsub.subscribe(
                requestName,
                handleRequest,
                this.clientContext,
              );
              netRequestList[requestId] = {
                params,
                requestName,
                subscriptionId,
              };
              // Collect and send the initial data
              const response = await requestFunction(
                this.clientContext,
                params,
                null!,
              );

              socketSend(socket, {
                type: "netRequestData",
                data: {
                  requestId: requestId,
                  response,
                },
              });
            } catch (err) {
              if (err === null) {
                // Send null for the first request, to indicate there is no data
                socketSend(socket, {
                  type: "netRequestData",
                  data: {
                    requestId: requestId,
                    response: null,
                  },
                });
              } else {
                handleNetRequestError(err);
              }
            }
            break;
          }
          case "netRequestEnd": {
            const {requestId} = messageData.data as {requestId: string};
            if (netRequestList[requestId]) {
              pubsub.unsubscribe(netRequestList[requestId]?.subscriptionId);
            }
            delete netRequestList[requestId];
            break;
          }
          case "dataStream": {
            const {cardName, params, requestId} = messageData.data;
            if (this.dataStreamList[requestId]) return;
            this.dataStreamList[requestId] = {cardName, params};

            break;
          }
          case "dataStreamEnd": {
            const {requestId} = messageData.data as {requestId: string};
            delete this.dataStreamList[requestId];
            break;
          }
        }
      } catch (err) {
        console.error(
          `Client ${this.id} sent invalid request data:${
            typeof data === "object" ? JSON.stringify(data) : data
          }`,
        );
        console.error(err);
      }
    });

    // Send a message to the client indicating that the connection is open
    socketSend(socket, {
      type: "ready",
    });
  }
  get cards() {
    // TODO: Figure out the cards here
    if (!this._cards) {
      // this._cards =
      //   this.clientContext.ship?.components.stationComplement?.stations
      //     .find(s => s.name === this.clientContext.flightClient?.stationId)
      //     ?.cards.map(c => c.component) || [];
      // this._cards =
      //   this._cards?.concat(
      //     this.clientContext.flightClient?.stationOverride?.cards.map(
      //       c => c.component,
      //     ) || [],
      //   ) || [];
      // This is required for the data that is passed to every connected client;
      // this._cards.push("allData");
    }

    return this._cards;
  }

  public async sendDataStream() {
    if (!this.clientContext?.flight) return;
    // TODO: Figure out some way to define the data stream data that doesn't rely on ECS
    // const entities = this.clientContext.flight.ecs.entities
    //   .filter(entity => {
    //     for (let requestId in this.dataStreamList) {
    //       const streamData = this.dataStreamList[requestId];
    //       const cardStream = cardDataStreams[streamData.cardName] as (
    //         entity: Entity,
    //         context: DataContext,
    //         params: any,
    //       ) => boolean;
    //       let includeEntity = cardStream?.(
    //         entity,
    //         this.clientContext,
    //         streamData.params,
    //       );
    //       if (includeEntity) return true;
    //     }
    //     return false;
    //   })
    //   .map((e: Entity) => {
    //     // For snapshot interpolation, entities have to be flat, other than quaternions.
    //     // See https://github.com/geckosio/snapshot-interpolation#world-state
    //     // We're also removing any components of the entity that don't update
    //     // frequently to keep packet size down.

    //     if (e.components.isWarpEngines) {
    //       return {
    //         id: e.id.toString(),
    //         x: e.components.isWarpEngines.forwardVelocity,
    //         y: e.components.isWarpEngines.maxVelocity,
    //       };
    //     }

    //     if (e.components.isImpulseEngines) {
    //       return {
    //         id: e.id.toString(),
    //         x: e.components.isImpulseEngines.forwardVelocity,
    //       };
    //     }

    //     // TODO May 9, 2022 - There should be logic here to indicate when
    //     // the snapshot should _not_ interpolate, for example when transitioning
    //     // from interstellar space to solar system space.
    //     const {parentId, type, ...position} = e.components.position || {};
    //     return {
    //       id: e.id.toString(),
    //       ...position,
    //       r: e.components.rotation,
    //     };
    //   });
    const entities = [];
    if (entities.length === 0) return;
    const snapshot = this.SI.snapshot.create(entities);
    socketSend(sockets[this.id], snapshot);
  }
}
