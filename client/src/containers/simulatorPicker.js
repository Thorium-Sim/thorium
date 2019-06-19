import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Label,
  Input,
  Button
} from "helpers/reactstrap";
import { Link } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { Rings } from "../helpers/loaders";
import { DateTime } from "luxon";

const QUERY = gql`
  query SideNav {
    simulators(template: true) {
      id
      name
    }
  }
`;

const SimulatorPicker = ({ triggerAlert }) => {
  const importSimulator = evt => {
    if (evt.target.files[0]) {
      const data = new FormData();
      Array.from(evt.target.files).forEach((f, index) =>
        data.append(`files[${index}]`, f)
      );
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
    <Query query={QUERY} fetchPolicy="cache-and-network">
      {({ data, loading }) =>
        loading || !data ? (
          <Rings color="#08f" width={100} height={100} />
        ) : (
          <Container>
            <Row>
              <Col sm="4">
                <h2>Simulators</h2>

                <ListGroup style={{ overflowY: "auto", maxHeight: "80vh" }}>
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
                  <div className="btn btn-sm btn-info btn-block">
                    Import Simulator
                  </div>
                  <Input hidden type="file" onChange={importSimulator} />
                </Label>
              </Col>
              <Col sm={{ size: 7, offset: 1 }}>
                <h2>Simulator Library</h2>
                <Query
                  query={gql`
                    query Externals {
                      externals {
                        simulators {
                          title
                          author
                          description
                          url
                          date
                        }
                      }
                    }
                  `}
                >
                  {({ loading, data: { externals } }) => (
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        maxHeight: "80vh",
                        overflowY: "auto",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      {loading && (
                        <Rings color="#08f" width={100} height={100} />
                      )}
                      {externals &&
                      externals.simulators.filter(
                        s => !data.simulators.find(sim => s.title === sim.name)
                      ).length > 0 ? (
                        externals.simulators
                          .filter(
                            s =>
                              !data.simulators.find(sim => s.title === sim.name)
                          )
                          .map(s => (
                            <Card key={s.title} style={{ width: "100%" }}>
                              <CardBody>
                                <Mutation
                                  mutation={gql`
                                    mutation ImportSimulator($url: String!) {
                                      importSimulatorFromUrl(url: $url)
                                    }
                                  `}
                                  variables={{ url: s.url }}
                                >
                                  {(action, { loading }) =>
                                    !loading && (
                                      <Button
                                        style={{ float: "right" }}
                                        color="success"
                                        onClick={() => {
                                          triggerAlert({
                                            color: "info",
                                            title: "Downloading simulator...",
                                            body:
                                              "This simulator is downloading in the background. Don't turn off Thorium Server. You can monitor download progress on your Thorium Server window."
                                          });
                                          action().then(() => {
                                            triggerAlert({
                                              color: "info",
                                              title:
                                                "Download complete. Refreshing browser..."
                                            });
                                            setTimeout(
                                              () => window.location.reload(),
                                              1500
                                            );
                                          });
                                        }}
                                      >
                                        Download
                                      </Button>
                                    )
                                  }
                                </Mutation>
                                <h3>{s.title}</h3>
                                <div>Author: {s.author}</div>
                                <div>
                                  Date Published:{" "}
                                  {DateTime.fromJSDate(
                                    new Date(s.date)
                                  ).toFormat("D")}
                                </div>
                                <div>Description:</div>
                                <div>{s.description}</div>
                              </CardBody>
                            </Card>
                          ))
                      ) : (
                        <Card>
                          <CardBody>
                            <h2>No simulators available.</h2>
                            <p>
                              You've already imported all of the available
                              simulators.
                            </p>
                          </CardBody>
                        </Card>
                      )}
                    </div>
                  )}
                </Query>
              </Col>
            </Row>
          </Container>
        )
      }
    </Query>
  );
};

export default SimulatorPicker;
