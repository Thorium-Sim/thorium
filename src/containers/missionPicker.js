import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Label,
  Input,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const QUERY = gql`
  query SideNav {
    missions {
      id
      name
    }
  }
`;
export default class MissionPicker extends Component {
  state = { loadingMission: false };
  createMission = action => {
    return () => {
      let name = prompt("What is the mission name?");
      if (name) {
        action({ variables: { name }, refetchQueries: [{ query: QUERY }] });
      }
    };
  };
  render() {
    const importMission = evt => {
      if (evt.target.files[0]) {
        const data = new FormData();
        Array.from(evt.target.files).forEach((f, index) =>
          data.append(`files[${index}]`, f)
        );
        this.setState({
          loadingMission: true
        });
        fetch(
          `${window.location.protocol}//${window.location.hostname}:${parseInt(
            window.location.port,
            10
          ) + 1}/importMission`,
          {
            method: "POST",
            body: data
          }
        ).then(() => {
          window.location.reload();
        });
      }
    };
    return (
      <Container>
        <Row>
          <Col sm={{ size: 4, offset: 4 }}>
            <h4>Missions</h4>
            <Query query={QUERY} fetchPolicy="cache-and-network">
              {({ data, loading }) =>
                loading ? null : (
                  <ListGroup>
                    {data.missions.map(m => (
                      <ListGroupItem
                        key={m.id}
                        tag={Link}
                        to={`/config/mission/${m.id}`}
                      >
                        {m.name}
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                )
              }
            </Query>
            <Label>
              <Mutation
                mutation={gql`
                  mutation AddMission($name: String!) {
                    createMission(name: $name)
                  }
                `}
              >
                {action => (
                  <Button
                    size="sm"
                    block
                    color="success"
                    onClick={this.createMission(action)}
                  >
                    Create Mission
                  </Button>
                )}
              </Mutation>
            </Label>
            <Label>
              <h5>Import Mission</h5>
              <Input type="file" onChange={importMission} />
            </Label>
          </Col>
        </Row>
        {this.state.loadingMission && (
          <div className="loading">
            <svg
              id="loader-1"
              version="1.1"
              viewBox="0 0 40 40"
              x="0px"
              y="0px"
              xmlSpace="preserve"
            >
              <path
                d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946&#xA;    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634&#xA;    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
                fill="#000"
                opacity="0.2"
              />
              <path
                d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0&#xA;    C22.32,8.481,24.301,9.057,26.013,10.047z"
                fill="#000"
              />
            </svg>
            <h1>Loading Mission</h1>
            <h4>This page will automatically refresh</h4>
          </div>
        )}
      </Container>
    );
  }
}
