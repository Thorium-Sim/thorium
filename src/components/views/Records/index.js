import React from "react";
import gql from "graphql-tag.macro";
import Records from "./records";
import {useSubscribeToMore} from "helpers/hooks/useQueryAndSubscribe";
import {useQuery} from "@apollo/react-hooks";
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

const QUERY = gql`
  query Records($simulatorId: ID!) {
    recordSnippets(simulatorId: $simulatorId) {
      ...RecordData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription TemplateUpdate($simulatorId: ID!) {
    recordSnippetsUpdate(simulatorId: $simulatorId) {
      ...RecordData
    }
  }
  ${fragment}
`;

const RecordsData = props => {
  const {simulator} = props;
  const {loading, data = {}, subscribeToMore} = useQuery(QUERY, {
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
  useSubscribeToMore(subscribeToMore, SUBSCRIPTION, subConfig);
  const {recordSnippets} = data;
  if (loading || !recordSnippets) return null;
  return <Records {...props} recordSnippets={recordSnippets} />;
};
export default RecordsData;
