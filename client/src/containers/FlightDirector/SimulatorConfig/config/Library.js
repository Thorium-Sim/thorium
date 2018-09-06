import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { paramCase } from "change-case";
import FontAwesome from "react-fontawesome";
import SubscriptionHelper from "helpers/subscriptionHelper";
import FileExplorer from "components/views/TacticalMap/fileExplorer";
const SUB = gql`
  subscription Library {
    libraryEntriesUpdate {
      id
      simulatorId
      body
      type
      title
      image
      seeAlso {
        id
        title
      }
      categories
    }
  }
`;

class Library extends Component {
  state = {};
  updateEntry = (key, value) => {
    this.setState({
      entry: Object.assign({}, this.state.entry, { [key]: value })
    });
  };
  submit = () => {
    const {
      entry: { id, title, type, body, image, seeAlso, categories, simulatorId }
    } = this.state;
    let mutation = gql`
      mutation AddLibraryEntry($entry: LibraryInput!) {
        addLibraryEntry(entry: $entry)
      }
    `;
    if (id) {
      mutation = gql`
        mutation UpdateLibraryEntry($entry: LibraryInput!) {
          updateLibraryEntry(entry: $entry)
        }
      `;
    }
    const variables = {
      entry: { id, title, type, body, image, seeAlso, categories, simulatorId }
    };
    this.props.client.mutate({ mutation, variables }).then(() => {
      this.setState({ entry: null });
    });
  };
  removeEntry = () => {
    const { entry } = this.state;
    const mutation = gql`
      mutation RemoveLibraryEntry($entry: ID!) {
        removeLibraryEntry(entry: $entry)
      }
    `;
    const variables = { entry: entry.id };
    this.props.client.mutate({ mutation, variables }).then(() => {
      this.setState({ entry: null });
    });
  };
  importEntries = evt => {
    if (evt.target.files[0]) {
      const data = new FormData();
      Array.from(evt.target.files).forEach((f, index) =>
        data.append(`files[${index}]`, f)
      );
      fetch(
        `${window.location.protocol}//${window.location.hostname}:${parseInt(
          window.location.port,
          10
        ) + 1}/importLibrary/${this.props.selectedSimulator.id}`,
        {
          method: "POST",
          body: data
        }
      ).then(() => {
        window.location.reload();
      });
    }
  };
  render() {
    const {
      data: { loading, libraryEntries }
    } = this.props;
    const { entry } = this.state;
    if (loading || !libraryEntries) return null;
    return (
      <Container>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SUB,
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  libraryEntries: subscriptionData.data.libraryEntriesUpdate
                });
              }
            })
          }
        />
        <h3>Library</h3>
        <Row>
          <Col sm={3}>
            <Card
              style={{ padding: 0, maxHeight: "75vh", overflowY: "scroll" }}
            >
              <CardBody>
                {libraryEntries
                  .filter(
                    l => l.simulatorId === this.props.selectedSimulator.id
                  )
                  .map(l => (
                    <p
                      key={l.id}
                      className={entry && l.id === entry.id ? "selected" : ""}
                      onClick={() => {
                        this.setState({
                          entry: Object.assign({}, l, {
                            seeAlso: l.seeAlso.map(s => s.id)
                          })
                        });
                      }}
                    >
                      {l.title}
                    </p>
                  ))}
              </CardBody>
            </Card>
            <Row>
              <Col sm={12}>
                <Button
                  color="success"
                  size="sm"
                  block
                  onClick={() =>
                    this.setState({
                      entry: {
                        seeAlso: [],
                        categories: [],
                        simulatorId: this.props.selectedSimulator.id
                      }
                    })
                  }
                >
                  Create
                </Button>
              </Col>
              <Col sm={12}>
                <h6>Import Library Entries</h6>
                <Input size="sm" type="file" onChange={this.importEntries} />
              </Col>
            </Row>
            {entry &&
              entry.id && (
                <Button
                  color="danger"
                  size="sm"
                  block
                  onClick={this.removeEntry}
                >
                  Delete Entry
                </Button>
              )}
            <Button
              color="info"
              size="sm"
              block
              as="a"
              href={`${window.location.protocol}//${
                window.location.hostname
              }:${parseInt(window.location.port, 10) + 1}/exportLibrary/${
                this.props.selectedSimulator.id
              }`}
            >
              Export Library
            </Button>
          </Col>
          <Col sm={9}>
            {entry && (
              <div>
                <Row style={{ maxHeight: "70vh", overflowY: "scroll" }}>
                  <Col sm={6}>
                    <FormGroup>
                      <Label>Title</Label>
                      <Input
                        type="text"
                        value={entry.title || ""}
                        onChange={e =>
                          this.updateEntry("title", e.target.value)
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Type</Label>
                      <Input
                        type="select"
                        value={entry.type || ""}
                        onChange={e => this.updateEntry("type", e.target.value)}
                      >
                        <option value={"general"}>General</option>
                        <option value={"command"}>Command</option>
                        <option value={"legal"}>Legal</option>
                        <option value={"medical"}>Medical</option>
                        <option value={"security"}>Security</option>
                        <option value={"damage"}>Damage</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Categories</Label>
                      <Input
                        type="select"
                        value={"select"}
                        onChange={e => {
                          let { value } = e.target;
                          if (value === "Other...") {
                            value = prompt(
                              "What is the name of the custom category?"
                            );
                            if (!value) return;
                          }
                          this.updateEntry(
                            "categories",
                            entry.categories
                              .concat(value)
                              .filter((c, i, a) => a.indexOf(c) === i)
                          );
                        }}
                      >
                        <option value="select" disabled>
                          Choose a Category
                        </option>
                        <option>Biographies</option>
                        <option>Creatures</option>
                        <option>History</option>
                        <option>Races</option>
                        <option>Misc</option>
                        <option>Planets</option>
                        <option>Procedures</option>
                        <option>Starships</option>
                        <option>Stellar Cartography</option>
                        <option>Technology</option>
                        <option>Other...</option>
                      </Input>
                      {entry.categories.map(s => (
                        <div key={`categories-list-${entry.id}-${s}`}>
                          {s}{" "}
                          <FontAwesome
                            className="text-danger"
                            name="ban"
                            onClick={() =>
                              this.updateEntry(
                                "categories",
                                entry.categories.filter(a => a !== s)
                              )
                            }
                          />
                        </div>
                      ))}
                    </FormGroup>
                  </Col>
                  <Col sm={6}>
                    <FormGroup>
                      <Label>Slug</Label>
                      <Input
                        type="text"
                        value={paramCase(entry.title)}
                        readOnly
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>See Also</Label>
                      <Input
                        type="select"
                        value={"select"}
                        onChange={e =>
                          this.updateEntry(
                            "seeAlso",
                            entry.seeAlso
                              .concat(e.target.value)
                              .filter((c, i, a) => a.indexOf(c) === i)
                          )
                        }
                      >
                        <option value="select" disabled>
                          Choose an Entry
                        </option>
                        {libraryEntries
                          .filter(
                            l =>
                              l.simulatorId ===
                                this.props.selectedSimulator.id ||
                              !l.simulatorId
                          )
                          .map(l => (
                            <option key={`see-also-${l.id}`} value={l.id}>
                              {l.title}
                            </option>
                          ))}
                      </Input>
                      {entry.seeAlso.map(s => (
                        <div key={`see-also-list-${entry.id}-${s}`}>
                          {libraryEntries.find(l => l.id === s).title}{" "}
                          <FontAwesome
                            className="text-danger"
                            name="ban"
                            onClick={() =>
                              this.updateEntry(
                                "seeAlso",
                                entry.seeAlso.filter(a => a !== s)
                              )
                            }
                          />
                        </div>
                      ))}
                    </FormGroup>
                  </Col>

                  <Col sm={12}>
                    <FormGroup>
                      <Label>Body</Label>
                      <Input
                        rows={10}
                        type="textarea"
                        value={entry.body || ""}
                        onChange={e => this.updateEntry("body", e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={12}>
                    <Label>Image</Label>
                    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                      <FileExplorer
                        directory="/Library Images"
                        selectedFiles={[entry.image]}
                        onClick={(evt, container) =>
                          this.updateEntry("image", container.fullPath)
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Button
                      size="sm"
                      color="danger"
                      block
                      onClick={() => this.setState({ entry: null })}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col sm={4}>
                    <Button
                      size="sm"
                      color="info"
                      block
                      disabled={!this.state.entry.id}
                      as="a"
                      href={`${window.location.protocol}//${
                        window.location.hostname
                      }:${parseInt(window.location.port, 10) +
                        1}/exportLibrary/${this.state.entry.simulatorId}/${
                        this.state.entry.id
                      }`}
                    >
                      Export
                    </Button>
                  </Col>
                  <Col sm={4}>
                    <Button
                      size="sm"
                      color="success"
                      block
                      onClick={this.submit}
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const QUERY = gql`
  query Library {
    libraryEntries {
      id
      simulatorId
      body
      type
      title
      image
      seeAlso {
        id
        title
      }
      categories
    }
  }
`;

export default graphql(QUERY)(withApollo(Library));
