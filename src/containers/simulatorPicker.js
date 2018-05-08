import React from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Label,
  Input
} from "reactstrap";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";

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
  return (
    <Container>
      <Row>
        <Col sm={{ size: 4, offset: 4 }}>
          <h4>Simulator</h4>
          <Query
            query={gql`
              query SideNav {
                simulators(template: true) {
                  id
                  name
                }
              }
            `}
            fetchPolicy="cache-and-network"
          >
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
            <h5>Import Simulator</h5>
            <Input type="file" onChange={importSimulator} />
          </Label>
        </Col>
      </Row>
    </Container>
  );
};

export default SimulatorPicker;
