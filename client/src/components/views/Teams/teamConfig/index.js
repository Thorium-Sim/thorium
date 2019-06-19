import React from "react";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody
} from "reactstrap";
import { titleCase } from "change-case";
import Priority from "./priority";
import Location from "./location";
const TeamConfig = ({
  selectedTeam,
  decks,
  teamType,
  crew,
  assignedOfficers,
  update,
  createTeam,
  commitTeam,
  assignOfficer,
  removeOfficer,
  removeTeam
}) => {
  const team = selectedTeam || {};
  let deck = {};
  let room = {};
  if (team.location) {
    deck = decks.find(d => d.id === team.location.id);
    if (!deck) {
      room = team.location;
      deck = room.deck;
    }
  }
  return (
    <Row>
      <Col xl={5} lg={6}>
        <FormGroup row className="team-name">
          <Label for="teamName" size="lg">
            Name
          </Label>
          <Input
            onChange={evt =>
              update(
                Object.assign({}, team, {
                  name: evt.target.value
                })
              )
            }
            type="text"
            id="teamName"
            disabled={!team.id}
            placeholder={`New ${titleCase(teamType)} Team`}
            size="lg"
            value={team.name || null}
          />
        </FormGroup>
        <FormGroup row className="team-orders">
          <Label for="teamOrders" size="lg">
            Orders
          </Label>
          <Input
            onChange={evt =>
              update(
                Object.assign({}, team, {
                  orders: evt.target.value
                })
              )
            }
            disabled={!team.id}
            type="textarea"
            id="teamOrders"
            placeholder=""
            rows={5}
            size="lg"
            value={team.orders || null}
          />
        </FormGroup>
        <Location
          update={update}
          decks={decks}
          deck={deck}
          room={room}
          team={team}
        />
        <Priority update={update} team={team} />

        {team.creating ? (
          <div>
            <Button
              block
              size="lg"
              color="success"
              className="create-button recall-button"
              disabled={
                !team.id ||
                team.officers.length === 0 ||
                !team.name ||
                !team.location ||
                !team.orders ||
                !team.priority
              }
              onClick={() => {
                createTeam(team);
              }}
            >
              Create {titleCase(teamType)} Team
            </Button>
            <Button
              block
              size="lg"
              color="danger"
              className="cancel-button"
              disabled={!team.id}
              onClick={() => {
                update(null);
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div>
            <Button
              block
              size="lg"
              color="success"
              disabled={
                !team.id ||
                team.officers.length === 0 ||
                !team.name ||
                !team.location ||
                !team.orders ||
                !team.priority
              }
              className="create-button recall-button"
              onClick={() => {
                commitTeam(team);
              }}
            >
              Update {titleCase(teamType)} Team
            </Button>
            <Button
              block
              size="lg"
              color="danger"
              className="cancel-button"
              disabled={!team.id}
              onClick={() => {
                removeTeam(team.id);
              }}
            >
              Recall {titleCase(teamType)} Team
            </Button>
          </div>
        )}
      </Col>
      <Col xl={{ size: 5, offset: 2 }} lg={{ size: 6 }} className="officers">
        <Label for="teamName" size="lg">
          Available Officers
        </Label>
        <Card className="crew-list">
          <CardBody>
            {crew
              .filter(c => assignedOfficers.indexOf(c.id) === -1)
              .map(c => (
                <div
                  className="officer"
                  key={c.id}
                  onClick={() => {
                    if (team) {
                      assignOfficer(c);
                    }
                  }}
                >
                  <p>{c.name}</p>
                  <small>{c.position}</small>
                </div>
              ))}
          </CardBody>
        </Card>
        <Label for="teamName" size="lg">
          Assigned Officers
        </Label>
        <Card className="crew-assigned">
          <CardBody>
            {team &&
              team.officers &&
              team.officers
                .concat()
                .filter(Boolean)
                .sort((a, b) => {
                  if (a.position > b.position) return 1;
                  if (a.position < b.position) return -1;
                  return 0;
                })
                .map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      if (team) {
                        removeOfficer(c);
                      }
                    }}
                    className={`officer ${c.killed ? "text-danger" : ""}`}
                  >
                    <p>{c.name}</p>
                    <small>{c.position}</small>
                  </div>
                ))}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default TeamConfig;
