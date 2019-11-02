const Sentry = require("@sentry/node");
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://f258079b8e8c45ee86d63c5ad5fd79ef@sentry.io/1323909",
  });
}
