import React from "react";
import {MockedProvider} from "@apollo/client/testing";
import mockGraphqlQuery from "./graphqlMocker.jsx";
import usePromise from "react-promise-suspense";

const defaultVariables = {simulatorId: "test"};
function allMockedQueries(queries) {
  return Promise.all(
    queries.map(([query, overrides, variables = defaultVariables]) =>
      mockGraphqlQuery(query, overrides, variables),
    ),
  );
}
const Provider = ({children, mocks = [], queries: queriesInput = []}) => {
  const queries = queriesInput.map(q => {
    if (Array.isArray(q)) return q;
    return [q];
  });
  const queryResults = usePromise(allMockedQueries, [queries]);
  const queryMocks = queryResults.map((q, i) => ({
    request: {
      query: queries[i][0],
      variables: queries[i][2] || defaultVariables,
    },
    result: q,
  }));
  const allMocks = [...mocks, ...queryMocks, ...queryMocks];
  return (
      <MockedProvider mocks={allMocks} addTypename={true}>
        {children}
      </MockedProvider>
  );
};

export default Provider;
