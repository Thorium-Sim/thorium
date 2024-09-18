import React, {Component} from "react";
import {Query, Mutation} from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import {ListGroup, ListGroupItem, Button} from "helpers/reactstrap";
import {InputField} from "../../generic/core";
import DecodingCore from "./decodingCore";
import {DateTime} from "luxon";

import "./style.scss";

function processTime(time) {
  return DateTime.fromISO(new Date(time).toISOString()).toLocaleString(
    DateTime.TIME_SIMPLE,
  );
}
const fragment = gql`
  fragment LRCommCoreData on LRCommunications {
    id
    messages {
      id
      sent
      crew
      message
      decodedMessage
      deleted
      encrypted
      approved
      sender
      timestamp
      a
      f
      ra
      rf
    }
    satellites
  }
`;

export const DECODING_CORE_QUERY = gql`
  query LongRangeComm($simulatorId: ID!) {
    longRangeCommunications(simulatorId: $simulatorId) {
      ...LRCommCoreData
    }
  }
  ${fragment}
`;
export const DECODING_CORE_SUBSCRIPTION = gql`
  subscription LongRangeCommUpdate($simulatorId: ID!) {
    longRangeCommunicationsUpdate(simulatorId: $simulatorId) {
      ...LRCommCoreData
    }
  }
  ${fragment}
`;
const DELETE_MUTATION = gql`
  mutation DeleteMessage($id: ID!, $message: ID!) {
    deleteLongRangeMessage(id: $id, message: $message)
  }
`;

class CommDecodingCore extends Component {
  state = {selectedMessage: null};
  render() {
    const {messages, satellites, id} = this.props;
    const {selectedMessage} = this.state;
    return (
      <div className="comm-convo-core">
        <div className="upper-section">
          <div className="convo-list">
            <ListGroup>
              {messages
                .concat()
                .reverse()
                .map(
                  ({
                    id,
                    sender,
                    deleted,
                    approved,
                    encrypted,
                    sent,
                    timestamp,
                    a,
                    f,
                    ra,
                    rf,
                  }) => (
                    <ListGroupItem
                      key={id}
                      className={`${deleted === true ? "text-danger" : ""} ${
                        approved === true && !sent && !deleted
                          ? "text-warning"
                          : ""
                      } ${!approved && !sent && !deleted ? "text-info" : ""} ${
                        a === ra && f === rf ? "text-success" : ""
                      }`}
                      title={`${sent === true ? "Sent" : ""} ${
                        a === ra && f === rf ? "Decoded" : ""
                      } ${deleted === true ? "Deleted" : ""} ${
                        !approved && !sent && !deleted ? "Not approved" : ""
                      } ${
                        approved === true && !sent && !deleted
                          ? "Approved, Not sent"
                          : ""
                      } `}
                      onClick={() => this.setState({selectedMessage: id})}
                      active={selectedMessage === id}
                    >
                      {sender} - {processTime(timestamp)}
                    </ListGroupItem>
                  ),
                )}
            </ListGroup>
            <Button
              color="success"
              size="sm"
              onClick={() => this.setState({selectedMessage: "new"})}
            >
              New Message
            </Button>
          </div>
          <div className="convo-content">
            <div className="content-area">
              {(() => {
                if (!selectedMessage) return null;
                if (selectedMessage === "new")
                  return <DecodingCore {...this.props} />;
                const message = messages.find(m => m.id === selectedMessage);
                if (!message) return null;
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <div style={{flex: 1}}>{`${processTime(message.timestamp)}${
                      message.encrypted ? ` - Encrypted` : ""
                    }${message.approved ? ` - Approved` : ""}
From: ${message.sender}
${message.message}`}</div>
                    <Mutation
                      mutation={DELETE_MUTATION}
                      variables={{id, message: message.id}}
                    >
                      {action => (
                        <Button color="danger" onClick={action} size="sm">
                          Delete Message
                        </Button>
                      )}
                    </Mutation>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
        <div>
          <label>Satellites:</label>
          <Mutation
            mutation={gql`
              mutation SetSatellites($id: ID!, $num: Int!) {
                setLongRangeSatellites(id: $id, num: $num)
              }
            `}
          >
            {action => (
              <InputField
                prompt="How many satellites should they have?"
                onClick={a => {
                  action({
                    variables: {
                      id: id,
                      num: parseInt(a, 10),
                    },
                  });
                }}
                style={{
                  display: "inline-block",
                  padding: "2px 7px",
                }}
              >
                {satellites}
              </InputField>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

const TemplateData = props => (
  <Query
    query={DECODING_CORE_QUERY}
    variables={{simulatorId: props.simulator.id}}
  >
    {({loading, data = {}, error, subscribeToMore}) => {
      const {longRangeCommunications} = data;
      if (loading || !longRangeCommunications) return null;
      if (!longRangeCommunications[0]) return <div>No Long Range Comm</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: DECODING_CORE_SUBSCRIPTION,
              variables: {simulatorId: props.simulator.id},
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  longRangeCommunications:
                    subscriptionData.data.longRangeCommunicationsUpdate,
                });
              },
            })
          }
        >
          <CommDecodingCore {...props} {...longRangeCommunications[0]} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default TemplateData;
