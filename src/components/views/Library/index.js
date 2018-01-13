import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Card, CardBody, Input, Button } from "reactstrap";
import { Asset } from "../../../helpers/assets";

import "./style.css";

const SUB = gql`
  subscription Library($simulatorId: ID) {
    libraryEntriesUpdate(simulatorId: $simulatorId, all: true) {
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
  subscription = null;
  state = {};
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            libraryEntries: subscriptionData.data.libraryEntriesUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  setCategory = category => {
    const { categoryFilter = [] } = this.state;
    if (categoryFilter.indexOf(category) > -1) {
      this.setState({
        categoryFilter: categoryFilter.filter(c => c !== category)
      });
    } else {
      this.setState({
        categoryFilter: categoryFilter.concat(category)
      });
    }
  };
  render() {
    const { data: { loading, libraryEntries } } = this.props;
    const { categoryFilter = [], searchFilter, selectedEntry } = this.state;
    if (loading || !libraryEntries) return null;
    const sEntry = libraryEntries.find(l => l.id === selectedEntry);
    return (
      <Container fluid className="library-card">
        <Row>
          <Col sm={3}>
            <h4>Entries</h4>
            <Input
              type="text"
              placeholder="search"
              value={searchFilter}
              onChange={e => this.setState({ searchFilter: e.target.value })}
            />
            <Card className="entry-list">
              <CardBody>
                {libraryEntries
                  .concat()
                  .filter(
                    l =>
                      categoryFilter.length === 0 ||
                      l.categories.reduce(
                        (prev, next) =>
                          prev || categoryFilter.indexOf(next) > -1,
                        false
                      )
                  )
                  .filter(l => l.title.match(new RegExp(searchFilter, "gi")))
                  .sort((a, b) => {
                    if (a.title > b.title) return 1;
                    if (a.title < b.title) return -1;
                    return 0;
                  })
                  .map(l => (
                    <p
                      key={l.id}
                      className={l.id === selectedEntry ? "selected" : ""}
                      onClick={() => this.setState({ selectedEntry: l.id })}
                    >
                      {l.title}
                    </p>
                  ))}
              </CardBody>
            </Card>
            <h4>Categories</h4>
            <Card className="category-list">
              <CardBody>
                {libraryEntries
                  .reduce((prev, next) => prev.concat(next.categories), [])
                  .filter((c, i, a) => a.indexOf(c) === i)
                  .sort()
                  .map(c => (
                    <p
                      key={`category-${c}`}
                      className={
                        categoryFilter.indexOf(c) > -1 ? "selected" : ""
                      }
                      onClick={() => this.setCategory(c)}
                    >
                      {c}
                    </p>
                  ))}
              </CardBody>
            </Card>
            <Button
              color="primary"
              block
              onClick={() =>
                this.setState({
                  categoryFilter: [],
                  searchFilter: ""
                })
              }
            >
              Clear Filter
            </Button>
          </Col>
          <Col sm={9} className={`entry-main ${selectedEntry ? "active" : ""}`}>
            <Row>
              <Col sm={{ size: 6, offset: 1 }}>
                <h4>Entry</h4>
                <Card className="entry-body">
                  <CardBody>{sEntry && sEntry.body}</CardBody>
                </Card>
              </Col>
              <Col sm={5}>
                <h4>Image</h4>
                {sEntry && (
                  <Asset
                    fail
                    asset={
                      sEntry &&
                      ((sEntry.image &&
                        (sEntry.image.substr(
                          0,
                          sEntry.image.lastIndexOf(".")
                        ) ||
                          sEntry.image)) ||
                        "/Library Images/noImage.png")
                    }
                  >
                    {({ src }) => (
                      <div
                        className="entry-image"
                        style={{
                          backgroundImage: `url('${src ||
                            require("./noImage.png")}')`
                        }}
                      />
                    )}
                  </Asset>
                )}
                <h4>See Also</h4>
                <Card className="entry-seeAlso">
                  <CardBody>
                    {sEntry &&
                      sEntry.seeAlso.map(s => (
                        <p
                          key={`seeAlso-${s.id}`}
                          onClick={() => this.setState({ selectedEntry: s.id })}
                        >
                          {s.title}
                        </p>
                      ))}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const QUERY = gql`
  query Library($simulatorId: ID) {
    libraryEntries(simulatorId: $simulatorId, all: true) {
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
export default graphql(QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Library));
