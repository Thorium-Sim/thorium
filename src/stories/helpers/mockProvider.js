import React from "react";
import {MockedProvider} from "@apollo/react-testing";
import mockGraphqlQuery from "./graphqlMocker.js";
import usePromise from "react-promise-suspense";
function allMockedQueries(queries) {
  return Promise.all(
    queries.map(([query, overrides, variables = {simulatorId: "test"}]) =>
      mockGraphqlQuery(query, overrides, variables),
    ),
  );
}
const Provider = ({children, mocks = [], queries = []}) => {
  const queryResults = usePromise(allMockedQueries, [queries]);
  const queryMocks = queryResults.map((q, i) => ({
    request: {
      query: queries[i][0],
      variables: queries[i][2] || {simulatorId: "test"},
    },
    result: q,
  }));
  const allMocks = [...mocks, ...queryMocks];
  return (
    <MockedProvider mocks={allMocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
};

export default Provider;
