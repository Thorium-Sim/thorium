import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Input,
  Card,
  CardBody
} from "reactstrap";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const QUERY = gql`
  query TaskDefinitions {
    taskDefinitions {
      id
      class
      name
      stations {
        name
      }
      valuesInput
      valuesValue
    }
  }
`;

class TaskTemplates extends Component {
  state = { selectedDef: "nothing" };
  render() {
    const { selectedDef } = this.state;
    return (
      <Query query={QUERY}>
        {({ loading, data: { taskDefinitions }, subscribeToMore }) => {
          if (loading) return null;
          const definitionGroups = taskDefinitions
            .concat()
            .sort((a, b) => {
              if (a.class > b.class) return 1;
              if (a.class < b.class) return -1;
              return 0;
            })
            .reduce((prev, n) => {
              prev[n.class] = prev[n.class] ? prev[n.class].concat(n) : [n];
              return prev;
            }, {});
          return (
            <Container fluid>
              <Row>
                <Col sm={4}>
                  <h3>Definitions</h3>
                  <Input
                    type="select"
                    value={selectedDef}
                    onChange={e =>
                      this.setState({ selectedDef: e.target.value })
                    }
                  >
                    <option value="nothing" disabled>
                      Select a task definition
                    </option>
                    {Object.entries(definitionGroups).map(([key, value]) => (
                      <optgroup key={key} label={key}>
                        {value.map(v => (
                          <option key={v.name} value={v.name}>
                            {v.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </Input>
                  <ListGroup />
                </Col>
                <Col sm={8}>
                  <h3>Task Templates</h3>
                  <Card>
                    <CardBody />
                  </Card>
                </Col>
              </Row>
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default TaskTemplates;
