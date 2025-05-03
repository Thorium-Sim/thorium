import React from "react";
import {Col, Row} from "helpers/reactstrap";
import {withApollo, useQuery} from "react-apollo";
import * as Macros from "../../../components/macros";
import gql from "graphql-tag.macro";
import ErrorBoundary from "helpers/errorBoundary";

const CLIENT_QUERY = gql`
  query Clients {
    clients {
      id
    }
  }
`;
const MacroConfig = props => {
  const {data, loading} = useQuery(CLIENT_QUERY);
  if (loading) return null;
  const _handleArg = (name, value) => {
    let {args} = props;
    args = JSON.parse(args) || {};
    args[name] = value;
    // Stringify it so it can be sent to the server
    props.updateMacro("args", JSON.stringify(args));
  };
  const {event, client} = props;
  const args = JSON.parse(props.args);
  const EventMacro =
    Macros[event] ||
    (() => {
      return null;
    });
  return (
    <Row>
      <Col sm="12">
        {EventMacro && (
          <ErrorBoundary render={<p>Error in macro</p>}>
            <EventMacro
              {...props}
              updateArgs={_handleArg}
              args={args || {}}
              client={client}
              clients={data.clients}
            />
          </ErrorBoundary>
        )}
      </Col>
    </Row>
  );
};

export default withApollo(MacroConfig);
