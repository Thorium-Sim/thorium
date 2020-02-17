import React from "react";
import gql from "graphql-tag.macro";
import Records from "./records";
import {useSubscribeToMore} from "helpers/hooks/useQueryAndSubscribe";
import {useQuery} from "@apollo/client";
import "./style.scss";

const fragment = gql`
  fragment RecordData on RecordSnippet {
    id
    name
    type
    launched
    records {
      id
      contents
      timestamp
      category
      modified
    }
  }
`;

export const RECORDS_QUERY = gql`
  query Records($simulatorId: ID!) {
    recordSnippets(simulatorId: $simulatorId) {
      ...RecordData
    }
  }
  ${fragment}
`;
export const RECORDS_SUB = gql`
  subscription TemplateUpdate($simulatorId: ID!) {
    recordSnippetsUpdate(simulatorId: $simulatorId) {
      ...RecordData
    }
  }
  ${fragment}
`;

const RecordsData = props => {
  const {simulator} = props;
  const {loading, data = {}, subscribeToMore} = useQuery(RECORDS_QUERY, {
    variables: {simulatorId: simulator.id},
  });
  const subConfig = React.useMemo(
    () => ({
      variables: {simulatorId: simulator.id},
      updateQuery: (previousResult, {subscriptionData}) => ({
        ...previousResult,
        recordSnippets: subscriptionData.data.recordSnippetsUpdate,
      }),
    }),
    [simulator.id],
  );
  useSubscribeToMore(subscribeToMore, RECORDS_SUB, subConfig);
  if (loading || !data) return null;
  const {recordSnippets} = data;
  return <Records {...props} recordSnippets={recordSnippets} />;
};
export default RecordsData;
