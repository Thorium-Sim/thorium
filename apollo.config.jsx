module.exports = {
  client: {
    service: "Thorium",
    excludes: ["./src/schema.graphql", "./src/generated/graphql.tsx"],
  },
  service: {
    endpoint: {
      url: "http://localhost:3001/graphql",
    },
  },
};
