import React, { Component } from "react";
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
import "./style.css";
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
class CrewCore extends Component {
  state = {};
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: INTERNAL_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            crew: subscriptionData.data.crewUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.sub && this.sub();
  }
  _importCrew = evt => {
    const self = this;
    const simulatorId = this.props.simulator.id;
    const files = evt.target.files;
    const reader = new FileReader();
    reader.onload = function() {
      const csv = this.result.split("\n");
      if (csv[0] !== "firstName,lastName,gender,age,rank,position") {
        alert("Invalid CSV file.");
        return;
      }
      const crew = csv.slice(1).map(c => {
        const obj = c.split(",");
        return {
          simulatorId,
          firstName: obj[0],
          lastName: obj[1],
          gender: obj[2],
          age: parseInt(obj[3], 10),
          rank: obj[4],
          position: obj[5]
        };
      });
      const mutation = gql`
        mutation AddCrew($crew: CrewInput) {
          addCrewmember(crew: $crew)
        }
      `;
      crew.forEach(c => {
        self.props.client.mutate({
          mutation,
          variables: {
            crew: c
          }
        });
      });
    };
    files[0] && reader.readAsText(files[0]);
  };
  _exportCrewCSV = () => {
    const { data: { crew } } = this.props;
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
  killRandom = () => {
    const { data: { crew } } = this.props;
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
    const { data: { crew } } = this.props;
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
    const { data: { loading, crew } } = this.props;
    const { selectedCrew, editing, search } = this.state;
    if (loading || !crew) return null;
    const selectedCrewMember = crew.find(c => c.id === selectedCrew);
    return (
      <Container className="crew-core">
        <Row>
          <Col sm={3}>
            <Row style={{ height: "20px", overflow: "hidden" }}>
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
                <Input type="file" onChange={this._importCrew} />
              </Col>
            </Row>
            <TypingField
              input
              controlled
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
                    } ${selectedCrew === c.id ? "selected" : ""}`}
                    onClick={() => this.setState({ selectedCrew: c.id })}
                  >
                    {c.firstName} {c.lastName}
                  </p>
                ))}
            </div>
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
              New Random Crewmember
            </Button>
            <Button
              size="sm"
              block
              color="warning"
              onClick={() => this.newRandom("security")}
            >
              New Security Crewmember
            </Button>
            <Input
              size="sm"
              type="select"
              value="select"
              color="warning"
              onChange={evt => this.newRandom(null, evt.target.value)}
            >
              <option value="select" disabled>
                New Damage Crewmember
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
            <Col sm={3}>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  readOnly={!editing}
                  size="sm"
                  type="text"
                  value={selectedCrewMember.firstName}
                  onChange={e => this.updateCrew("firstName", e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  readOnly={!editing}
                  size="sm"
                  type="text"
                  value={selectedCrewMember.lastName}
                  onChange={e => this.updateCrew("lastName", e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Age</Label>
                <Input
                  readOnly={!editing}
                  size="sm"
                  type="text"
                  value={selectedCrewMember.age}
                  onChange={e => this.updateCrew("age", e.target.value)}
                />
              </FormGroup>
            </Col>
          )}
          {selectedCrewMember && (
            <Col sm={3}>
              <FormGroup>
                <Label>Position</Label>
                <Input
                  readOnly={!editing}
                  size="sm"
                  type="text"
                  value={selectedCrewMember.position}
                  onChange={e => this.updateCrew("position", e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Rank</Label>
                <Input
                  readOnly={!editing}
                  size="sm"
                  type="text"
                  value={selectedCrewMember.rank}
                  onChange={e => this.updateCrew("rank", e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Gender</Label>
                <Input
                  disabled={!editing}
                  size="sm"
                  type="select"
                  value={selectedCrewMember.gender || "nothing"}
                  onChange={e => this.updateCrew("gender", e.target.value)}
                >
                  <option value={"nothing"} disabled>
                    Select a gender
                  </option>
                  <option value={"M"}>M</option>
                  <option value={"F"}>F</option>
                </Input>
              </FormGroup>
            </Col>
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
