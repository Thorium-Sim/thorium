import {FlightDataModel} from "@server/newClasses/FlightDataModel";
import {ServerDataModel} from "@server/newClasses/ServerDataModel";
import requests, {AllRequestNames} from "@server/requests";
import inputs, {AllInputNames} from "@server/inputs";
import type buildHTTPServer from "./buildHttpServer";
import {DataContext} from "@server/newClasses/DataContext";

const NETSEND_PATH = "/netSend";
const NETREQUEST_PATH = "/netRequest";

function checkBody(body: any, clientId: string) {
  if (typeof body !== "object") throw new Error("Body must be a JSON object");
  if (!clientId)
    throw new Error(
      "Every event request must have a client ID. Assign it by passing an 'authorization' header like 'Bearer {clientId}'",
    );
}
function checkBodyInput(
  body: any,
  clientId: string,
): asserts body is {input: AllInputNames} {
  checkBody(body, clientId);
  const bodyObject = (body || {}) as object | {input: AllInputNames};
  if (!("input" in bodyObject))
    throw new Error(
      "Invalid event input. It must be a JSON body with a `input` property.",
    );
  if (!(bodyObject.input in inputs)) {
    throw new Error(
      `Invalid event input. "${String(
        bodyObject.input,
      )}" is not a valid input name.`,
    );
  }
}
function checkBodyNetRequest(
  body: any,
  clientId: string,
): asserts body is {request: AllRequestNames} {
  checkBody(body, clientId);
  const bodyObject = (body || {}) as object | {request: AllRequestNames};
  if (!("request" in bodyObject))
    throw new Error(
      "Invalid event input. It must be a JSON body with a `request` property.",
    );
  if (!(bodyObject.request in requests)) {
    throw new Error(
      `Invalid request name. "${String(
        bodyObject.request,
      )}" is not a valid request name.`,
    );
  }
}
type Awaited<T> = T extends Promise<infer U> ? U : T;

export async function setUpAPI(
  app: Awaited<ReturnType<typeof buildHTTPServer>>,
  database: {
    server: ServerDataModel;
    flight: FlightDataModel | null;
  },
) {
  // This just maps all of the inputs to a single HTTP endpoint.
  // In the future, this could be changed to make it so each of
  // these is its own API endpoint.
  app.post(NETSEND_PATH, async (req, reply) => {
    let body = req.body as any;
    // For file uploads, we need to process the body differently
    if (req.isMultipart()) {
      let currentBody = body as Record<
        string,
        {fieldname: string; value: string; filename?: string}
      >;
      body = {};
      let fileParams = {} as any;
      for (const part in currentBody) {
        let key = currentBody[part].fieldname;
        let value = currentBody[part].value;
        let filename = currentBody[part].filename;
        let fieldname = currentBody[part].fieldname;
        if (value === "undefined") continue;
        if (!value) continue;
        // If this part is a file, store it separately to combine
        // with the body later
        if (filename) {
          fileParams[fieldname] = value;
        } else {
          // Params are JSON strings, so we need to parse them
          if (key === "params") {
            body = {...body, ...JSON.parse(value)};
          } else {
            body[key] = value;
          }
        }
      }
      body = {...body, ...fileParams};
    }
    const clientId =
      req.headers.authorization?.replace("Bearer ", "").replace("bearer", "") ||
      "";
    checkBodyInput(body, clientId);
    const clientContext = new DataContext(clientId, database);
    const {input, ...params} = body;
    try {
      const inputFunction = inputs[input];
      const response =
        (await inputFunction(clientContext, params as any)) || {};

      // Send the result back to the client, regardless of what it is.
      return response;
    } catch (err) {
      let message = err;
      if (err instanceof Error) {
        message = err.message;
      }
      console.error(`Error in input ${String(input)}: ${message}`);
      if (err instanceof Error && process.env.NODE_ENV !== "production")
        console.error(err.stack);
      return reply
        .code(400)
        .header("content-type", "application/json")
        .send(JSON.stringify({error: message}));
    }
  });

  app.post(NETREQUEST_PATH, async (req, reply) => {
    let body = req.body as any;
    const clientId =
      req.headers.authorization?.replace("Bearer ", "").replace("bearer", "") ||
      "";
    checkBodyNetRequest(body, clientId);
    const clientContext = new DataContext(clientId, database);
    const {request, ...params} = body;
    try {
      const requestFunction = requests[request];
      const response = await requestFunction(
        clientContext,
        params as any,
        null!,
      );

      // Send the result back to the client, regardless of what it is.
      return response;
    } catch (err) {
      if (err === null) return {};

      let message = err;
      if (err instanceof Error) {
        message = err.message;
      }
      console.error(`Error in request ${String(request)}: ${message}`);
      if (err instanceof Error && process.env.NODE_ENV !== "production")
        console.error(err.stack);
      return reply
        .code(400)
        .header("content-type", "application/json")
        .send(JSON.stringify({error: message}));
    }
  });
}
