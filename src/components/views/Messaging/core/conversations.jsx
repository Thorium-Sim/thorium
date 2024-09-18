import React, {Fragment} from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  Input,
  Button,
} from "helpers/reactstrap";
import {Mutation} from "react-apollo";
import gql from "graphql-tag.macro";
import GroupManager from "./groupManager";
import {FaArrowRight} from "react-icons/fa";
import {scrollTo} from "..";
import usePrevious from "helpers/hooks/usePrevious";

function reduceMessages(messages, stationNames) {
  const talkers = Object.keys(
    messages.reduce((prev, next) => {
      prev[next.sender] = true;
      prev[next.destination] = true;
      return prev;
    }, {}),
  ).filter(t => stationNames.indexOf(t) === -1);

  return messages.reduce((prev, next) => {
    if (talkers.indexOf(next.sender) > -1) {
      prev[next.sender] = {
        sender: next.sender,
        destination: next.destination,
        id: next.id,
        date: new Date(next.timestamp),
      };
    } else if (talkers.indexOf(next.destination) > -1) {
      prev[next.destination] = {
        sender: next.destination,
        destination: next.sender,
        id: next.id,
        date: new Date(next.timestamp),
      };
    }
    return prev;
  }, {});
}

function alertReducer(state, action) {
  switch (action.type) {
    case "select":
      return {alert: state.alert, selectedConvo: action.selectedConvo};
    case "messageAlert": {
      const list = action.messageList.filter(
        m =>
          action.stationNames.indexOf(m.destination) > -1 &&
          m.sender !== (state.selectedConvo && state.selectedConvo.sender) &&
          !action.oldMessageList.find(o => o.id === m.id),
      );
      if (list.length === 0) return state;
      const alertMessages = list
        .map(m => m.id)
        .reduce((prev, next) => ({...prev, [next]: true}), {});
      return {
        selectedConvo: state.selectedConvo,
        alert: {...state.alert, ...alertMessages},
      };
    }
    case "setAlert":
      return {
        selectedConvo: action.selectedConvo || state.selectedConvo,
        alert: {...state.alert, [action.id]: action.value},
      };
    default:
      return state;
  }
}
const Conversations = props => {
  const {messages, simulator} = props;
  const [{alert, selectedConvo}, dispatch] = React.useReducer(alertReducer, {
    alert: {},
    selectedConvo: null,
  });

  const [newMessage, setNewMessage] = React.useState(null);
  const [messageInput, setMessageInput] = React.useState(null);
  const messageHolder = React.useRef();
  const previousMessages = usePrevious(messages);

  React.useEffect(() => {
    const stationNames = simulator.stations.map(s => s.name);
    const messageList = Object.values(reduceMessages(messages, stationNames));
    const oldMessageList = Object.values(
      reduceMessages(previousMessages, stationNames),
    );
    dispatch({type: "messageAlert", messageList, oldMessageList, stationNames});
  }, [messages, previousMessages, simulator.stations]);

  const scrollElement = () => {
    const el = messageHolder.current;
    if (el) {
      scrollTo(el, el.scrollHeight, 600);
    }
  };

  React.useEffect(() => {
    setTimeout(scrollElement, 100);
  }, [messages]);

  const stationNames = simulator.stations.map(s => s.name);
  const messageList = Object.values(
    reduceMessages(messages, stationNames),
  ).sort((a, b) => {
    if (a.date > b.date) return -1;
    if (b.date > a.date) return 1;
    return 0;
  });
  return (
    <Fragment>
      <Container
        style={{flex: 1, height: "100%"}}
        className="new-messaging-core"
      >
        <Row style={{height: "100%"}}>
          <Col
            sm={4}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ListGroup style={{flex: 1, overflowY: "scroll"}}>
              {messageList.map(m => (
                <ListGroupItem
                  key={m.id}
                  active={m.sender === selectedConvo?.sender}
                  className={`${
                    alert[m.id] && m.sender !== selectedConvo?.sender
                      ? "alerted"
                      : ""
                  }`}
                  onClick={() => {
                    dispatch({
                      type: "setAlert",
                      selectedConvo: m,
                      id: m.id,
                      value: false,
                    });
                  }}
                >
                  <p>
                    <strong>{m.sender}</strong> <FaArrowRight /> {m.destination}
                  </p>
                </ListGroupItem>
              ))}
            </ListGroup>
            {!newMessage && (
              <Button
                size="sm"
                color="success"
                onClick={() => setNewMessage(true)}
              >
                New Convo
              </Button>
            )}
          </Col>
          <Col
            sm={8}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card
              className="full flex-max auto-scroll"
              style={{flexDirection: "column-reverse"}}
              ref={messageHolder}
            >
              {messages
                .filter(
                  m =>
                    selectedConvo &&
                    (m.sender === selectedConvo.sender ||
                      m.destination === selectedConvo.sender),
                )
                .concat()
                .sort((a, b) => {
                  if (a.timestamp > b.timestamp) return 1;
                  if (a.timestamp < b.timestamp) return -1;
                  return 0;
                })
                .reverse()
                .map(m => (
                  <p key={m.id} style={{whiteSpace: "pre-wrap"}}>
                    <strong>{m.sender}</strong>: {m.content}
                  </p>
                ))}
            </Card>
            <Mutation
              mutation={gql`
                mutation SendMessage($message: MessageInput!) {
                  sendMessage(message: $message)
                }
              `}
            >
              {action => (
                <form
                  // eslint-disable-next-line
                  action={"javascript:void(0);"}
                  style={{display: "flex"}}
                  onSubmit={e => {
                    e.preventDefault();
                    if (!selectedConvo || !messageInput) return;
                    action({
                      variables: {
                        message: {
                          simulatorId: simulator.id,
                          destination: selectedConvo.destination,
                          sender: selectedConvo.sender,
                          content: messageInput,
                        },
                      },
                    });
                    setMessageInput("");
                  }}
                >
                  <Input
                    bsSize="sm"
                    type="text"
                    value={messageInput || ""}
                    onFocus={() =>
                      selectedConvo &&
                      dispatch({
                        type: "setAlert",
                        id: selectedConvo.id,
                        value: false,
                      })
                    }
                    onChange={evt => setMessageInput(evt.target.value)}
                  />
                  <Button
                    size="sm"
                    type="submit"
                    disabled={!selectedConvo || !messageInput}
                  >
                    Send
                  </Button>
                </form>
              )}
            </Mutation>
          </Col>
        </Row>
      </Container>
      {newMessage && (
        <GroupManager
          {...props}
          cancel={() => setNewMessage(false)}
          startConvo={(sender, destination) => {
            dispatch({
              type: "select",
              selectedConvo: {sender, destination, id: "new"},
            });
            setNewMessage(false);
          }}
        />
      )}
    </Fragment>
  );
};

export default Conversations;
