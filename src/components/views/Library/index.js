import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Card, CardBody, Input } from "reactstrap";
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
  render() {
    if (this.props.data.loading || !this.props.data.libraryEntries) return null;
    return (
      <Container fluid className="library-card">
        <Row>
          <Col sm={3}>
            <h4>Entries</h4>
            <Input type="text" placeholder="search" />
            <Card className="entry-list">
              <CardBody>
                <p>Hello</p>
              </CardBody>
            </Card>
            <h4>Categories</h4>
            <Card className="category-list">
              <CardBody>
                <p>Hello</p>
              </CardBody>
            </Card>
          </Col>
          <Col sm={9}>
            <Row>
              <Col sm={{ size: 6, offset: 1 }}>
                <h4>Entry</h4>
                <Card className="entry-body">
                  <CardBody>
                    <p>Hello</p>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={5}>
                <h4>Image</h4>
                <div
                  className="entry-image"
                  style={{ backgroundImage: "url('https://placehold.it/600')" }}
                />
                <h4>See Also</h4>
                <Card className="entry-seeAlso">
                  <CardBody>
                    <p>Hello</p>
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
