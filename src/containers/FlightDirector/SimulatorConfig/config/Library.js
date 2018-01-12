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
import FileExplorer from "../../../../components/views/TacticalMap/fileExplorer";

const SUB = gql`
  subscription Library($simulatorId: ID) {
    libraryEntriesUpdate(simulatorId: $simulatorId) {
      id
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
  componentWillUnmount() {
    this.subscription();
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: SUB,
        variables: {
          simulatorId: nextProps.selectedSimulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            libraryEntries: subscriptionData.data.libraryEntriesUpdate
          });
        }
      });
    }
  }
  updateEntry = (key, value) => {
    this.setState({
      entry: Object.assign({}, this.state.entry, { [key]: value })
    });
  };
  submit = () => {
    const { entry } = this.state;
    let mutation = gql`
      mutation AddLibraryEntry($entry: LibraryInput!) {
        addLibraryEntry(entry: $entry)
      }
    `;
    if (entry.id) {
      mutation = gql`
        mutation UpdateLibraryEntry($entry: LibraryInput!) {
          updateLibraryEntry(entry: $entry)
        }
      `;
    }
    const variables = { entry };
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
  render() {
    const { data: { loading, libraryEntries } } = this.props;
    const { entry } = this.state;
    if (loading || !libraryEntries) return null;
    return (
      <Container>
        <h3>Library</h3>
        <Row>
          <Col sm={3}>
            <Card>
              <CardBody>
                {libraryEntries.map(l => (
                  <p
                    key={l.id}
                    className={entry && l.id === entry.id ? "selected" : ""}
                    onClick={() => {
                      this.setState({ entry: l });
                    }}
                  >
                    {l.title}
                  </p>
                ))}
              </CardBody>
            </Card>
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
              Create Entry
            </Button>
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
          </Col>
          <Col sm={9}>
            {entry && (
              <Row>
                <Col sm={6}>
                  <FormGroup>
                    <Label>Title</Label>
                    <Input
                      type="text"
                      value={entry.title || ""}
                      onChange={e => this.updateEntry("title", e.target.value)}
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
                      onChange={e =>
                        this.updateEntry(
                          "categories",
                          entry.categories
                            .concat(e.target.value)
                            .filter((c, i, a) => a.indexOf(c) === i)
                        )
                      }
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
                    </Input>
                    {entry.categories.map(s => (
                      <div key={`categories-list-${s}`}>
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
                          entry.seeAlso.push({
                            id: e.target.value,
                            title: libraryEntries.find(
                              l => l.id === e.target.value
                            ).title
                          })
                        )
                      }
                    >
                      <option value="select" disabled>
                        Choose an Entry
                      </option>
                      {libraryEntries.map(l => (
                        <option key={`see-also-${l.id}`} value={l.id}>
                          {l.title}
                        </option>
                      ))}
                    </Input>
                    {entry.seeAlso.map(s => (
                      <div key={`see-also-list-${s.id}`}>
                        {s.title}{" "}
                        <FontAwesome
                          className="text-danger"
                          name="ban"
                          onClick={() =>
                            this.updateEntry(
                              "seeAlso",
                              entry.seeAlso.filter(a => a.id !== s.id)
                            )
                          }
                        />>
                      </div>
                    ))}
                  </FormGroup>
                </Col>

                <Col sm={12}>
                  <FormGroup>
                    <Label>Body</Label>
                    <Input
                      type="textarea"
                      value={entry.body || ""}
                      onChange={e => this.updateEntry("body", e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <Label>Image</Label>
                  <FileExplorer
                    directory="/Library Images"
                    selectedFiles={[entry.image]}
                    onClick={(evt, container) =>
                      this.updateEntry("image", container.fullPath)
                    }
                  />
                </Col>
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
                <Col sm={{ size: 4, offset: 4 }}>
                  <Button size="sm" color="success" block onClick={this.submit}>
                    Save
                  </Button>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const QUERY = gql`
  query Library($simulatorId: ID) {
    libraryEntries(simulatorId: $simulatorId) {
      id
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

export default graphql(QUERY, {
  options: ownProps => ({
    variables: { simulatorId: ownProps.selectedSimulator.id }
  })
})(withApollo(Library));
