import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col } from "reactstrap";
import ReactTable from "react-table";
import Tour from "helpers/tourHelper";
import { FormattedMessage } from "react-intl";

import "react-table/react-table.css";
import SubscriptionHelper from "helpers/subscriptionHelper";

import "./style.scss";

const columns = [
  {
    Header: "Name",
    accessor: "name" // String-based value accessors!
  },
  {
    Header: "Age",
    accessor: "age"
  },
  {
    Header: "Gender",
    accessor: "gender"
  },
  {
    Header: "Position",
    accessor: "position"
  },
  {
    Header: "Rank",
    accessor: "rank"
  }
];

const SUB = gql`
  subscription RosterUpdate($simulatorId: ID) {
    crewUpdate(simulatorId: $simulatorId) {
      id
      name
      age
      rank
      gender
      position
    }
  }
`;
const trainingSteps = [
  {
    selector: ".nothing",
    content: (
      <FormattedMessage
        id="roster-training-1"
        defaultMessage="On this screen you will see a list of the officers that are on the ship. You can see their name, age, gender, position, and rank. Understanding this information will help you to know what skills are available to you and who you are responsible for as a bridge officer."
      />
    )
  },
  {
    selector: ".rt-thead",
    content: (
      <FormattedMessage
        id="roster-training-2"
        defaultMessage="To find officers faster you can sort the crew by clicking on the description above each column."
      />
    )
  },
  {
    selector: ".pagination-bottom",
    content: (
      <FormattedMessage
        id="roster-training-3"
        defaultMessage="Use the next or previous button to scroll through multiple pages."
      />
    )
  }
];
class Roster extends Component {
  render() {
    const {
      data: { loading, crew }
    } = this.props;
    if (loading || !crew) return null;

    return (
      <Container className="roster-card" style={{ height: "100%" }}>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  crew: subscriptionData.data.crewUpdate
                });
              }
            })
          }
        />
        <Row style={{ height: "100%" }}>
          <Col sm={12} style={{ height: "100%" }}>
            <ReactTable
              style={{ height: "100%" }}
              data={crew}
              columns={columns}
              filterable={true}
              showPageSizeOptions={false}
              resizable={false}
            />
          </Col>
        </Row>
        <Tour steps={trainingSteps} client={this.props.clientObj} />
      </Container>
    );
  }
}

const QUERY = gql`
  query Roster($simulatorId: ID) {
    crew(simulatorId: $simulatorId) {
      id
      name
      age
      rank
      gender
      position
    }
  }
`;

export default graphql(QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Roster));
