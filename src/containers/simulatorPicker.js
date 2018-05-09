import React from "react";
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
    simulators(template: true) {
      id
      name
    }
  }
`;

const SimulatorPicker = () => {
  const importSimulator = evt => {
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
        ) + 1}/importSimulator`,
        {
          method: "POST",
          body: data
        }
      ).then(() => {
        window.location.reload();
      });
    }
  };
  const createSimulator = action => {
    return () => {
      const name = prompt("What class of simulator is this? eg. Jump Carrier");
      if (name) {
        action({ variables: { name }, refetchQueries: [{ query: QUERY }] });
      }
    };
  };
  return (
    <Container>
      <Row>
        <Col sm={{ size: 4, offset: 4 }}>
          <h4>Simulator</h4>
          <Query query={QUERY} fetchPolicy="cache-and-network">
            {({ data, loading }) =>
              loading ? null : (
                <ListGroup>
                  {data.simulators.map(s => (
                    <ListGroupItem
                      key={s.id}
                      tag={Link}
                      to={`/config/simulator/${s.id}`}
                    >
                      {s.name}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )
            }
          </Query>
          <Label>
            <Mutation
              mutation={gql`
                mutation AddSimulator($name: String!) {
                  createSimulator(name: $name, template: true)
                }
              `}
            >
              {action => (
                <Button
                  size="sm"
                  block
                  color="success"
                  onClick={createSimulator(action)}
                >
                  Create Simulator
                </Button>
              )}
            </Mutation>
          </Label>
          <Label>
            <h5>Import Simulator</h5>
            <Input type="file" onChange={importSimulator} />
          </Label>
        </Col>
      </Row>
    </Container>
  );
};

export default SimulatorPicker;
