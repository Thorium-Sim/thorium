import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import ViewscreenCards from "../../viewscreens";
import Immutable from "immutable";

//const INTERNAL_SUB = gql``;

class Viewscreen extends Component {
  constructor(props) {
    super(props);
    this.internalSub = null;
  }
  componentWillReceiveProps(nextProps) {
    /*if (!this.internalSub && !nextProps.data.loading) {
      this.internalSub = nextProps.data.subscribeToMore({
        document: INTERNAL_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ longRangeCommunications: subscriptionData.data.longRangeCommunicationsUpdate }).toJS();
        }
      });
    }*/
  }
  render() {
    if (this.props.data.loading) return null;
    const viewscreen = this.props.data.viewscreens.find(
      v => v.id === this.props.clientObj.id
    );
    if (!viewscreen) return <div>No Viewscreen</div>;
    if (ViewscreenCards[viewscreen.component]) {
      const ViewscreenComponent = ViewscreenCards[viewscreen.component];
      return <ViewscreenComponent />;
    }
    if (!viewscreen)
      return (
        <div>
          No Viewscreen Component for {viewscreen.component}
        </div>
      );
  }
}

const VIEWSCREEN_QUERY = gql`
  query Viewscreens($simulatorId: ID) {
    viewscreens(simulatorId: $simulatorId) {
      id
      name
      component
    }
  }
`;
export default graphql(VIEWSCREEN_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Viewscreen));
