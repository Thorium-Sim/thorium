import fetch from "node-fetch";
import App from "../app";

// Simple client singleton

class GraphQLClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }
  query(queryParams) {
    return fetch(this.endpoint, {
      method: "POST",
      headers: {
        authorization: `Bearer ${App.spaceEdventuresToken}`,
        ...queryParams.headers,
      },
      body: JSON.stringify({
        query: queryParams.query,
        variables: queryParams.variables,
      }),
    }).then(res => res.json());
  }
}

export default new GraphQLClient(
  process.env.NODE_ENV === "production"
    ? "https://us-central1-space-edventures.cloudfunctions.net/api/graphql"
    : "http://localhost:5000/space-edventures/us-central1/api/graphql",
);
