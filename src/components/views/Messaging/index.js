import React from "react";
import gql from "graphql-tag.macro";
import {useMutation, useQuery, useSubscription} from "react-apollo";
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  Card,
  InputGroup,
  InputGroupAddon,
} from "helpers/reactstrap";
import "./style.scss";
import {FormattedMessage} from "react-intl";
import Tour from "helpers/tourHelper";
import {useSubscribeToMore} from "helpers/hooks/useQueryAndSubscribe";
import ConvoPicker from "./convoPicker";
import useFlightSessionStorage from "helpers/hooks/useFlightSessionStorage";

export const MESSAGING_SUB = gql`
  subscription GotMessage($simulatorId: ID!, $station: String) {
    sendMessage(simulatorId: $simulatorId, station: $station) {
      id
      sender
      content
      timestamp
      simulatorId
      destination
    }
  }
`;

export const MESSAGING_TEAMS_SUB = gql`
  subscription TeamsUpdate($simulatorId: ID) {
    teamsUpdate(simulatorId: $simulatorId, cleared: true) {
      id
      name
      type
      cleared
    }
  }
`;

export const MESSAGING_QUERY = gql`
  query Messages($simulatorId: ID!, $station: String) {
    messages(simulatorId: $simulatorId, station: $station) {
      id
      sender
      content
      timestamp
      simulatorId
      destination
    }
    teams(simulatorId: $simulatorId, cleared: true) {
      id
      name
      type
      cleared
    }
    simulators(id: $simulatorId) {
      id
      bridgeOfficerMessaging
    }
  }
`;

export const trainingSteps = [
  {
    selector: "#nothing",
    content: (
      <FormattedMessage
        id="messages-training-1"
        defaultMessage="Messaging allows you to send text messages between people within your ship."
      />
    ),
  },
  {
    selector: ".message-dropdown",
    content: (
      <FormattedMessage
        id="messages-training-2"
        defaultMessage="To send a message, click this button. A dropdown will appear showing you all of the options for places you can send your message."
      />
    ),
  },
  {
    selector: ".convoList",
    content: (
      <FormattedMessage
        id="messages-training-3"
        defaultMessage="This is your list of current conversations. Click on a conversation to see that conversation on the right side."
      />
    ),
  },
  {
    selector: ".messages-list",
    content: (
      <FormattedMessage
        id="messages-training-4"
        defaultMessage="The messages in the selected conversation appear here."
      />
    ),
  },
  {
    selector: ".text-input",
    content: (
      <FormattedMessage
        id="messages-training-5"
        defaultMessage="Type any message you want to send in this box. Press the enter key or the 'Send Message' button to send the message."
      />
    ),
  },
];

const SEND_MESSAGE = gql`
  mutation SendMessage($message: MessageInput!) {
    sendMessage(message: $message)
  }
`;
const Messaging = ({simulator, station, flight: {id: flightId}}) => {
  const [messageInput, setMessageInput] = useFlightSessionStorage(
    flightId,
    "messagingMessageInput",
    "",
  );
  const [
    selectedConversation,
    setSelectedConversation,
  ] = useFlightSessionStorage(flightId, "messagingSelectedConversation", null);

  const messageHolder = React.useRef();
  // componentDidUpdate() {
  //   const el = messageHolder.current;
  //   if (el) {
  //     el.scrollTop = el.scrollHeight;
  //   }
  // }
  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      message: {
        simulatorId: simulator.id,
        destination: selectedConversation,
        sender: station.name,
        content: messageInput,
      },
    },
  });
  const sendMessage = () => {
    sendMessageMutation();
    setMessageInput("");
  };
  const scrollElement = () => {
    const el = messageHolder.current;
    if (el) {
      scrollTo(el, el.scrollHeight, 600);
    }
  };

  React.useEffect(() => {
    setTimeout(scrollElement, 100);
  }, []);

  const {data, loading, subscribeToMore} = useQuery(MESSAGING_QUERY, {
    variables: {simulatorId: simulator.id, station: station.name},
  });
  const config = React.useMemo(
    () => ({
      variables: {simulatorId: simulator.id, station: station.name},
      updateQuery: (previousResult, {subscriptionData}) => {
        if (!subscriptionData.data.sendMessage) return previousResult;
        setTimeout(scrollElement, 100);
        return Object.assign({}, previousResult, {
          messages: previousResult.messages.concat(
            subscriptionData.data.sendMessage,
          ),
        });
      },
    }),
    [simulator.id, station.name],
  );
  useSubscribeToMore(subscribeToMore, MESSAGING_SUB, config);
  const {data: teamsSub} = useSubscription(MESSAGING_TEAMS_SUB, {
    variables: {simulatorId: simulator.id},
  });

  if (loading) return null;
  const {messages} = data;
  const teams = teamsSub ? teamsSub.teamsUpdate : data.teams;

  const messageGroups = station.messageGroups;
  const convoObj = messages
    .filter(
      m =>
        !teams.find(
          t =>
            t.cleared === true &&
            (t.name === m.sender || t.name === m.destination),
        ),
    )
    .reduce((prev, next) => {
      if (next.sender === station.name) {
        prev[next.destination] = Object.assign({}, next, {
          convo: next.destination,
        });
      } else if (messageGroups.indexOf(next.destination) > -1) {
        prev[next.destination] = Object.assign({}, next, {
          convo: next.destination,
        });
      } else {
        prev[next.sender] = Object.assign({}, next, {convo: next.sender});
      }
      return prev;
    }, {});

  const conversations = Object.keys(convoObj)
    .map(c => convoObj[c])
    .sort((a, b) => {
      if (new Date(a.timestamp) > new Date(b.timestamp)) return -1;
      if (new Date(a.timestamp) < new Date(b.timestamp)) return 1;
      return 0;
    });

  return (
    <Container className="messages">
      <Row>
        <Col sm={3}>
          <h4>Conversations</h4>
          <Card className="convoList">
            {conversations.map(c => (
              <li
                className={`list-group-item ${
                  c.convo === selectedConversation ? "selected" : ""
                }`}
                key={c.id}
                onClick={() => setSelectedConversation(c.convo)}
              >
                <div>{c.convo}</div>
                <div>
                  <small>
                    {c.content
                      ? `${c.content.substr(0, 25)}${
                          c.content.length > 25 ? "..." : ""
                        }`
                      : null}
                  </small>
                </div>
              </li>
            ))}
          </Card>
          <ConvoPicker
            simulator={simulator}
            station={station}
            setSelectedConversation={setSelectedConversation}
            messageGroups={messageGroups}
            teams={teams}
          />
        </Col>
        <Col sm={9} className="messages-list">
          <h4>Messages</h4>

          <Card>
            <div className="message-holder" ref={messageHolder}>
              {selectedConversation && (
                <h2 className="convoHeader">
                  Conversation with {selectedConversation}
                </h2>
              )}
              {messages
                .filter(
                  m =>
                    m.sender === selectedConversation ||
                    m.destination === selectedConversation,
                )
                .map(m => (
                  <p
                    key={m.id}
                    className={`message ${
                      m.sender === station.name ? "sent" : ""
                    }`}
                  >
                    <strong>{m.sender}</strong>: {m.content}
                  </p>
                ))}
            </div>
          </Card>
          <form
            className="text-input"
            // eslint-disable-next-line
            action={"javascript:void(0);"}
            onSubmit={sendMessage}
          >
            <InputGroup>
              <Input
                data-testid="Messaging-Input"
                disabled={!selectedConversation}
                onChange={evt => setMessageInput(evt.target.value)}
                value={messageInput}
              />
              <InputGroupAddon addonType="append">
                <Button
                  disabled={!selectedConversation}
                  type="submit"
                  color="primary"
                >
                  Send Message
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </form>
        </Col>
      </Row>
      <Tour steps={trainingSteps} />
    </Container>
  );
};

export default Messaging;

export function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  let difference = to - element.scrollTop;
  let perTick = (difference / duration) * 10;

  setTimeout(function () {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}
