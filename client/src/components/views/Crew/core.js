import React, { Fragment, Component } from "react";
import {
  Container,
  Row,
  Col,
  Label,
  FormGroup,
  Input,
  Button
} from "reactstrap";
import gql from "graphql-tag";
import { TypingField } from "../../generic/core";
import { graphql, withApollo } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { parse } from "papaparse";

import "./style.scss";
const damagePositions = [
  "Computer Specialist",
  "Custodian",
  "Quality Assurance",
  "Electrician",
  "Explosive Expert",
  "Fire Control",
  "General Engineer",
  "Hazardous Waste Expert",
  "Maintenance Officer",
  "Mechanic",
  "Plumber",
  "Structural Engineer",
  "Welder"
];

const INTERNAL_SUB = gql`
  subscription CrewUpdate($simulatorId: ID) {
    crewUpdate(simulatorId: $simulatorId) {
      id
      simulatorId
      firstName
      lastName
      position
      age
      rank
      gender
      killed
    }
  }
`;
const fields = ["firstName", "lastName", "gender", "age", "rank", "position"];
class CrewCore extends Component {
  state = {};
  _importCrew = evt => {
    const simulatorId = this.props.simulator.id;
    const [file] = evt.target.files;
    parse(file, {
      header: true,
      complete: results => {
        const { data, meta, errors } = results;
        if (JSON.stringify(meta.fields) !== JSON.stringify(fields)) {
          alert(
            `Header row mismatch. Make sure you have the correct headers in the correct order.`
          );
          return;
        }
        errors.forEach(err => {
          console.error(err);
        });
        this.props.client.mutate({
          mutation: gql`
            mutation ImportCrew($simulatorId: ID!, $crew: [CrewInput]!) {
              crewImport(simulatorId: $simulatorId, crew: $crew)
            }
          `,
          variables: {
            simulatorId,
            crew: data.filter(c => c && c.firstName)
          }
        });
      }
    });
  };
  _exportCrewCSV = () => {
    const {
      data: { crew }
    } = this.props;
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    const doc = [];
    doc.push(
      ["firstName", "lastName", "gender", "age", "rank", "position"].join(",")
    );
    crew.forEach(c =>
      doc.push(
        [c.firstName, c.lastName, c.gender, c.age, c.rank, c.position].join(",")
      )
    );

    const blob = new Blob([doc.join("\n")], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "crewExport.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };
  updateCrew = (which, value, id = this.state.selectedCrew) => {
    const variables = {
      crew: { id, [which]: value }
    };
    const mutation = gql`
      mutation UpdateCrew($crew: CrewInput) {
        updateCrewmember(crew: $crew)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  removeCrew = () => {
    const id = this.state.selectedCrew;
    const mutation = gql`
      mutation RemoveCrew($id: ID!) {
        removeCrewmember(id: $id)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables: { id }
    });
    this.setState({
      selectedCrew: null
    });
  };
  removeAll = () => {
    const mutation = gql`
      mutation RemoveAllCrew($simulatorId: ID!) {
        removeAllCrew(simulatorId: $simulatorId)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables: { simulatorId: this.props.simulator.id }
    });
    this.setState({
      selectedCrew: null
    });
  };
  killRandom = () => {
    const {
      data: { crew }
    } = this.props;
    const livingCrew = crew.filter(c => !c.killed);
    const crewMember =
      livingCrew[Math.floor(Math.random() * livingCrew.length)];
    this.updateCrew("killed", true, crewMember.id);
  };
  newRandom = (type, position) => {
    const mutation = gql`
      mutation NewRandomCrew(
        $simulatorId: ID!
        $type: String
        $position: String
      ) {
        newRandomCrewmember(
          simulatorId: $simulatorId
          type: $type
          position: $position
        )
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      type,
      position
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  search = () => {
    const {
      data: { crew }
    } = this.props;
    const { search } = this.state;
    const regex = new RegExp(search, "gi");
    return crew.filter(
      c =>
        regex.test(c.firstName) ||
        regex.test(c.lastName) ||
        regex.test(c.position) ||
        regex.test(c.rank)
    );
  };
  render() {
    const {
      data: { loading, crew }
    } = this.props;
    const { selectedCrew, editing, search } = this.state;
    if (loading || !crew) return null;
    const selectedCrewMember = crew.find(c => c.id === selectedCrew);
    return (
      <Container className="crew-core">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: INTERNAL_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  crew: subscriptionData.data.crewUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm={3}>
            <Row style={{ height: "31px", overflow: "hidden" }}>
              <Col sm={6}>
                <Button
                  size="sm"
                  block
                  color="primary"
                  onClick={this._exportCrewCSV}
                >
                  Export
                </Button>
              </Col>
              <Col sm={6}>
                <label>
                  <div className="btn btn-sm btn-info btn-block">Import</div>
                  <input
                    type="file"
                    accept="text/csv"
                    hidden
                    value={""}
                    onChange={this._importCrew}
                  />
                </label>
              </Col>
            </Row>
            <TypingField
              input
              controlled
              placeholder="Search..."
              style={{ height: "32px" }}
              value={search}
              onChange={e => this.setState({ search: e.target.value })}
            />
            <div className="crew-list">
              {this.search()
                .concat()
                .sort((a, b) => {
                  if (a.lastName > b.lastName) return 1;
                  if (a.lastName < b.lastName) return -1;
                  return 0;
                })
                .map(c => (
                  <p
                    key={c.id}
                    className={`${c.killed ? "killed" : ""}  ${
                      !c.killed && damagePositions.indexOf(c.position) > -1
                        ? "text-success"
                        : ""
                    } ${
                      !c.killed && /security/gi.test(c.position)
                        ? "text-warning"
                        : ""
                    } ${
                      !c.killed && /medical/gi.test(c.position)
                        ? "text-info"
                        : ""
                    } ${selectedCrew === c.id ? "selected" : ""}`}
                    onClick={() => this.setState({ selectedCrew: c.id })}
                  >
                    {c.firstName} {c.lastName}
                  </p>
                ))}
            </div>
            Total Crew: {this.props.data.crew.length}
            <Button block color="danger" size="sm" onClick={this.removeAll}>
              Remove All
            </Button>
          </Col>
          <Col sm={3}>
            {selectedCrewMember && (
              <div>
                <Row>
                  <Col sm={6}>
                    {editing && (
                      <Button
                        size="sm"
                        block
                        color="primary"
                        onClick={() => this.setState({ editing: false })}
                      >
                        Finish
                      </Button>
                    )}
                    {!editing && (
                      <Button
                        size="sm"
                        block
                        color="success"
                        onClick={() => this.setState({ editing: true })}
                      >
                        Edit
                      </Button>
                    )}
                  </Col>
                  <Col sm={6}>
                    <Button
                      size="sm"
                      block
                      color="danger"
                      onClick={this.removeCrew}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
                {!selectedCrewMember.killed && (
                  <Button
                    size="sm"
                    block
                    color="danger"
                    onClick={() => this.updateCrew("killed", true)}
                  >
                    Kill
                  </Button>
                )}
                {selectedCrewMember.killed && (
                  <Button
                    size="sm"
                    block
                    color="info"
                    onClick={() => this.updateCrew("killed", false)}
                  >
                    Revive
                  </Button>
                )}
              </div>
            )}
            <Button
              size="sm"
              block
              color="danger"
              onClick={() => this.killRandom()}
            >
              Kill Random
            </Button>
            <Button
              size="sm"
              block
              color="secondary"
              onClick={() => this.newRandom()}
            >
              New Random Crew
            </Button>
            <Button
              size="sm"
              block
              color="warning"
              onClick={() => this.newRandom("security")}
            >
              New Security Crew
            </Button>
            <Button
              size="sm"
              block
              color="info"
              onClick={() => this.newRandom("medical")}
            >
              New Medical Crew
            </Button>
            <Input
              size="sm"
              type="select"
              value="select"
              color="warning"
              onChange={evt => this.newRandom(null, evt.target.value)}
            >
              <option value="select" disabled>
                New Damage Crew
              </option>
              <option>Computer Specialist</option>
              <option>Custodian</option>
              <option>Quality Assurance</option>
              <option>Electrician</option>
              <option>Explosive Expert</option>
              <option>Fire Control</option>
              <option>General Engineer</option>
              <option>Hazardous Waste Expert</option>
              <option>Maintenance Officer</option>
              <option>Mechanic</option>
              <option>Plumber</option>
              <option>Structural Engineer</option>
              <option>Welder</option>
            </Input>
          </Col>
          {selectedCrewMember && (
            <Fragment key={selectedCrew}>
              <Col sm={3}>
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    readOnly={!editing}
                    size="sm"
                    type="text"
                    defaultValue={selectedCrewMember.firstName}
                    onChange={e => this.updateCrew("firstName", e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    readOnly={!editing}
                    size="sm"
                    type="text"
                    defaultValue={selectedCrewMember.lastName}
                    onChange={e => this.updateCrew("lastName", e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Age</Label>
                  <Input
                    readOnly={!editing}
                    size="sm"
                    type="text"
                    defaultValue={selectedCrewMember.age}
                    onChange={e => this.updateCrew("age", e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col sm={3}>
                <FormGroup>
                  <Label>Position</Label>
                  <Input
                    readOnly={!editing}
                    size="sm"
                    type="text"
                    defaultValue={selectedCrewMember.position}
                    onChange={e => this.updateCrew("position", e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Rank</Label>
                  <Input
                    readOnly={!editing}
                    size="sm"
                    type="text"
                    defaultValue={selectedCrewMember.rank}
                    onChange={e => this.updateCrew("rank", e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Gender</Label>
                  <Input
                    disabled={!editing}
                    size="sm"
                    type="select"
                    defaultValue={selectedCrewMember.gender || "nothing"}
                    onChange={e => this.updateCrew("gender", e.target.value)}
                  >
                    <option value={"nothing"} disabled>
                      Select a gender
                    </option>
                    <option value={"M"}>M</option>
                    <option value={"F"}>F</option>
                    <option value={"X"}>X</option>
                  </Input>
                </FormGroup>
              </Col>
            </Fragment>
          )}
        </Row>
      </Container>
    );
  }
}

const CREW_QUERY = gql`
  query Crew($simulatorId: ID) {
    crew(simulatorId: $simulatorId) {
      id
      simulatorId
      firstName
      lastName
      position
      age
      rank
      gender
      killed
    }
  }
`;
export default graphql(CREW_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(CrewCore));
