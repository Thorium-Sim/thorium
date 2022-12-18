import {NETREQUEST_PATH, NETSEND_PATH} from "../constants";

type HTTPHeaders = Record<string, string | string[] | undefined>;

export type HeadersResolver =
  | HTTPHeaders
  | (() => HTTPHeaders | Promise<HTTPHeaders>);
export type LiveQueryClientOptions = {
  baseUrl?: string;
  netSendPath?: string;
  netRequestPath?: string;
  headers?: HeadersResolver;
};
type RequestOptions = {
  signal?: AbortSignal;
  headers?: HeadersResolver;
  path: string;
  input: any;
};
export class LiveQueryClient {
  requestUrl: URL;
  sendUrl: URL;
  headers: HTTPHeaders | (() => HTTPHeaders | Promise<HTTPHeaders>);
  constructor({
    baseUrl = window.location.origin,
    netRequestPath = NETREQUEST_PATH,
    netSendPath = NETSEND_PATH,
    headers = {},
  }: LiveQueryClientOptions = {}) {
    this.requestUrl = new URL(netRequestPath, baseUrl);
    this.sendUrl = new URL(netSendPath, baseUrl);
    this.headers = headers;
  }
  private async makeRequest(
    url: URL,
    body: any,
    signal?: AbortSignal,
    inputHeaders?: HeadersResolver,
  ) {
    const headers = {
      ...(typeof this.headers === "function"
        ? await this.headers()
        : this.headers),
      ...(typeof inputHeaders === "function"
        ? await inputHeaders()
        : inputHeaders),
      "Content-Type": "application/json",
    };
    let result: any = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal,
    }).then(res => res.text());

    try {
      result = JSON.parse(result);
      if (result?.error) {
        throw new Error(result.error);
      }
    } catch {
      // Who knows what happened?
    }

    return result;
  }
  async netRequest(opts: RequestOptions) {
    return await this.makeRequest(
      this.requestUrl,
      {path: opts.path, ...opts.input},
      opts.signal,
      opts.headers,
    );
  }
  async netSend(opts: RequestOptions) {
    // const body = new FormData();
    // body.append("input", type.toString());
    // let count = 0;
    // for (const key in params) {
    //   const value = params[key];
    //   if (value instanceof File) {
    //     body.append(key, value);
    //     params[key] = {} as any;
    //   } else if (value instanceof Blob) {
    //     body.append(key, value, `blob-${count++}`);
    //     params[key] = {} as any;
    //   } else if (value instanceof FileList) {
    //     for (let i = 0; i < value.length; i++) {
    //       body.append(`${key}[]`, value[i]);
    //     }
    //     params[key] = [] as any;
    //   }
    // }
    //  body.append("params", JSON.stringify(params));

    return await this.makeRequest(
      this.sendUrl,
      {path: opts.path, ...opts.input},
      opts.signal,
      opts.headers,
    );
  }
}
