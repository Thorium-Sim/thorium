import chalk from "chalk";
import type buildHttpServer from "./buildHttpServer";
import {buildHttpsProxy} from "./httpsProxy";
import symbols from "fastify/lib/symbols.js";

export async function startServer(
  app: Awaited<ReturnType<typeof buildHttpServer>>,
) {
  const PORT =
    Number(process.env.PORT) ||
    (process.env.NODE_ENV === "production" ? 4444 : 3002);
  const HTTPSPort = PORT + 1;

  try {
    await app.listen({port: PORT});
    if (process.env.NODE_ENV === "production") {
      const proxy = buildHttpsProxy(PORT);
      await proxy.listen({port: HTTPSPort});
    }
    console.info(chalk.greenBright(`Access app at http://localhost:${PORT}`));
    console.info(
      chalk.cyan(`Doing port forwarding? Open this port in your router:`),
    );
    console.info(chalk.cyan(`  - TCP ${PORT} for web app access`));
    console.info(chalk.cyan(`  - TCP ${HTTPSPort} for HTTPS access`));
    process.send?.("ready");
  } catch (err) {
    process.send?.("error");
    console.error(err);
    app.log.error(err);
  }
}
