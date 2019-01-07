import * as Sentry from "@sentry/browser";
import { version } from "../../package.json";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    release: `react@${version}`,
    dsn: "https://c71a50635f9b42f4a70880cce6a7ff0e@sentry.io/1323903"
  });
}
