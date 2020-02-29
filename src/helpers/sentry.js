import * as Sentry from "@sentry/browser";
import {version} from "../../package.json";

const invalidMessages = [
  "ResizeObserver loop limit exceeded",
  "Network error: Failed to fetch",
];
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    release: `react@${version}`,
    dsn: "https://c71a50635f9b42f4a70880cce6a7ff0e@sentry.io/1323903",
    beforeSend(event) {
      if (invalidMessages.includes(event?.exception?.mechanism?.data?.message))
        return null;
      return event;
    },
  });
} else {
  // window.addEventListener("error", function(e) {
  //  // console.error(e);
  // });
}
