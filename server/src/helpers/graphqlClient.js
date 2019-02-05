const { query } = require("graphqurl");

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
        ...queryParams.headers
      }
    });
  }
}

export default new GraphQLClient(
  "https://us-central1-space-edventures-beta.cloudfunctions.net/api/graphql"
);
