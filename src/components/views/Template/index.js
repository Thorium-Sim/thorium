import React from "react";
import gql from "graphql-tag.macro";
import Template from "./template";
import {useSubscribeToMore} from "helpers/hooks/useQueryAndSubscribe";
import {useQuery} from "@apollo/react-hooks";
import "./style.scss";

const fragment = gql`
  fragment TemplateData on Template {
    id
  }
`;

const QUERY = gql`
  query Template($simulatorId: ID!) {
    _template(simulatorId: $simulatorId) {
      ...TemplateData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription TemplateUpdate($simulatorId: ID!) {
    _templateUpdate(simulatorId: $simulatorId) {
      ...TemplateData
    }
  }
  ${fragment}
`;

const TemplateData = props => {
  const {simulator} = props;
  const {loading, data = {}, subscribeToMore} = useQuery(QUERY, {
    variables: {simulatorId: simulator.id},
  });
  const subConfig = React.useMemo(
    () => ({
      variables: {simulatorId: simulator.id},
      updateQuery: (previousResult, {subscriptionData}) => ({
        ...previousResult,
        template: subscriptionData.data.templateUpdate,
      }),
    }),
    [simulator.id],
  );
  useSubscribeToMore(subscribeToMore, SUBSCRIPTION, subConfig);
  const {template} = data;
  if (loading || !template) return null;
  if (!template[0]) return <div>No Template</div>;
  return <Template {...props} {...template[0]} />;
};
export default TemplateData;
