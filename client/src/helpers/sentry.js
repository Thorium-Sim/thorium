import * as Sentry from "@sentry/browser";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://c71a50635f9b42f4a70880cce6a7ff0e@sentry.io/1323903"
  });
}
