import React from "react";
import gql from "graphql-tag";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import useQueryAndSubscription from "helpers/hooks/useQueryAndSubscribe";
import "./style.scss";
import {useMutation} from "@apollo/client";

const fragment = gql`
  fragment StationClientData on Client {
    id
    station {
      name
      cards {
        name
        assigned
        newStation
      }
    }
    currentCard {
      name
    }
  }
`;

export const STATION_CLIENT_QUERY = gql`
  query Clients($simulatorId: ID!) {
    clients(simulatorId: $simulatorId) {
      ...StationClientData
    }
  }
  ${fragment}
`;
export const STATION_CLIENT_SUB = gql`
  subscription TemplateUpdate($simulatorId: ID!) {
    clientChanged(simulatorId: $simulatorId) {
      ...StationClientData
    }
  }
  ${fragment}
`;

const UNASSIGN_CARD = gql`
  mutation UnassignCard($simulatorId: ID!, $cardName: String!) {
    stationUnassignCard(simulatorId: $simulatorId, cardName: $cardName)
  }
`;

const ASSIGN_CARD = gql`
  mutation AssignCard(
    $simulatorId: ID!
    $assignedToStation: String!
    $cardName: String!
  ) {
    stationAssignCard(
      simulatorId: $simulatorId
      assignedToStation: $assignedToStation
      cardName: $cardName
    )
  }
`;

const StationControl = props => {
  const [selectedClient, setSelectedClient] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const {simulator} = props;
  const {loading, data} = useQueryAndSubscription(
    {query: STATION_CLIENT_QUERY, variables: {simulatorId: simulator.id}},
    {query: STATION_CLIENT_SUB, variables: {simulatorId: simulator.id}},
  );

  const [removeAssignment] = useMutation(UNASSIGN_CARD, {
    variables: {simulatorId: simulator.id, cardName: selectedCard},
  });
  const [performAssignment] = useMutation(ASSIGN_CARD);

  if (loading || !data) return null;
  const {clients} = data;
  if (!clients) return <div>No Clients</div>;
  const stationNameCount = {};

  const clientList = clients
    .map((client, i, arr) => {
      if (!client.station) return null;
      const count = stationNameCount?.[client.station.name] + 1 || 1;
      stationNameCount[client.station.name] = count;
      let showCount = count > 1;
      if (count === 1) {
        if (
          arr.find(
            (c, ii) => ii > i && c?.station?.name === client?.station?.name,
          )
        ) {
          showCount = true;
        }
      }
      return {
        id: client.id,
        currentCard: client.currentCard.name,
        label: `${client.station.name}${showCount ? ` (${count})` : ""}`,
        station: client.station,
        cards: client.station.cards,
      };
    })
    .filter(Boolean);
  const stations = clients
    .reduce((acc, next) => acc.concat(next?.station?.name), [])
    .filter((a, i, arr) => arr.indexOf(a) === i)
    .filter(Boolean);

  const client = clients.find(c => c.id === selectedClient);
  const assignCard = client?.station.cards.find(c => c.name === selectedCard);
  const assignCardAssignedTo = clientList.find(client =>
    client.cards.find(
      card => card.name === assignCard?.name && card.newStation,
    ),
  );

  function assignCardToClient(station) {
    performAssignment({
      variables: {
        simulatorId: simulator.id,
        cardName: selectedCard,
        assignedToStation: station,
      },
    });
  }

  return (
    <Container className="card-stationControl">
      <Row>
        <Col sm={4}>
          <h3>Stations</h3>
          <ListGroup>
            {clientList.map(c => (
              <ListGroupItem
                key={c.id}
                onClick={() => {
                  setSelectedClient(c.id);
                  setSelectedCard(null);
                }}
                active={selectedClient === c.id}
              >
                <div>{c.label}</div>
                <div>
                  <small>{c.currentCard}</small>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        {client && (
          <Col sm={4}>
            <h3>Screens</h3>
            <ListGroup>
              {client.station.cards
                .filter(c => !c.newStation)
                .map(c => {
                  const assignedTo =
                    c.assigned &&
                    clientList.find(client =>
                      client.cards.find(
                        card => card.name === c.name && card.newStation,
                      ),
                    );
                  return (
                    <ListGroupItem
                      key={c.name}
                      onClick={() => setSelectedCard(c.name)}
                      active={c.name === selectedCard}
                    >
                      <div>{c.name}</div>
                      <div>
                        <small>
                          {assignedTo && `Assigned To: ${assignedTo.label}`}
                        </small>
                      </div>
                    </ListGroupItem>
                  );
                })}
            </ListGroup>
          </Col>
        )}
        {assignCard && (
          <Col sm={4}>
            <h3>Assign To:</h3>
            <ListGroup>
              {stations
                .filter(station => station !== client.station.name)
                .map(c => (
                  <ListGroupItem
                    key={`assigning-${c}`}
                    onClick={() => assignCardToClient(c)}
                    active={assignCardAssignedTo?.station.name === c}
                  >
                    {c}
                  </ListGroupItem>
                ))}
            </ListGroup>
            {assignCardAssignedTo && (
              <Button color="danger" block onClick={removeAssignment}>
                Remove Assignment
              </Button>
            )}
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default StationControl;
