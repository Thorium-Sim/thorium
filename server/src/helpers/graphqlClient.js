import { query } from "graphqurl";
import App from "../app";

// Simple client singleton

class GraphQLClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }
  query(queryParams) {
    return query({
      ...queryParams,
      endpoint: this.endpoint,
      headers: {
        authorization: `Bearer ${App.spaceEdventuresToken}`,
        ...queryParams.headers
      }
    });
  }
}

export default new GraphQLClient(
  process.env.NODE_ENV === "production"
    ? "https://us-central1-space-edventures.cloudfunctions.net/api/graphql"
    : "http://localhost:5000/space-edventures/us-central1/api/graphql"
);
