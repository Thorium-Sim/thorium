import schema from "../data";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import vanity from "./vanity";
import ipaddress from "../helpers/ipaddress";

// Load some other stuff
import "../events";
import "../processes";
import "./autoupdate";

export default (server, GRAPHQL_PORT, CLIENT_PORT) => {
  const GraphQLOptions = request => ({
    schema,
    context: { clientId: request.headers.clientid }
  });

  const options = {
    endpointURL: "/graphql" // URL for the GraphQL endpoint this instance of GraphiQL serves
  };

  server.use(
    "/graphql",
    bodyParser.json({ limit: "4mb" }),
    graphqlExpress(GraphQLOptions)
  );
  server.use("/graphiql", graphiqlExpress(options));

  vanity();
  server.listen(GRAPHQL_PORT, () =>
    console.log(
      `
Client Server is now running on http://${ipaddress}:${CLIENT_PORT}/client
Access the Flight Director on http://${ipaddress}:${CLIENT_PORT}
GraphQL Server is now running on http://${ipaddress}:${GRAPHQL_PORT}/graphql
Access GraphiQL developer tool on http://${ipaddress}:${GRAPHQL_PORT}/graphiql`
    )
  );
};
