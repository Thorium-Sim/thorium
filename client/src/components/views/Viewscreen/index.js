import React, { Fragment, Component } from "react";
import gql from "graphql-tag.macro";
import { graphql, withApollo } from "react-apollo";
import * as ViewscreenCards from "components/viewscreens";
import SubscriptionHelper from "helpers/subscriptionHelper";
import SoundPlayer from "../../client/soundPlayer";

import "./style.scss";

const VIEWSCREEN_SUB = gql`
  subscription ViewscreenSub($simulatorId: ID) {
    viewscreensUpdate(simulatorId: $simulatorId) {
      id
      name
      component
      data
      pictureInPicture {
        data
        size
        position
        component
      }
    }
  }
`;

export class Viewscreen extends Component {
  sub = null;
  keydown = e => {
    const variables = {
      simulatorId: this.props.simulator.id
    };
    const mutation = gql`
      mutation AutoAdvance($simulatorId: ID!, $prev: Boolean) {
        autoAdvance(simulatorId: $simulatorId, prev: $prev, limited: true)
      }
    `;
    if (e.which === 39 || e.which === 33) {
      this.props.client.mutate({
        mutation,
        variables
      });
    }
    if (e.which === 37 || e.which === 34) {
      variables.prev = true;
      this.props.client.mutate({
        mutation,
        variables
      });
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.keydown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydown);
  }
  renderComponent() {
    if (this.props.component) {
      const ViewscreenComponent = ViewscreenCards[this.props.component];
      return <ViewscreenComponent {...this.props} />;
    }
    const {
      data: { loading, viewscreens },
      clientObj
    } = this.props;
    if (loading || !viewscreens) return null;
    const viewscreen = viewscreens.find(v => v.id === clientObj.id);
    if (!viewscreen) return <div>No Viewscreen</div>;
    if (ViewscreenCards[viewscreen.component]) {
      const ViewscreenComponent = ViewscreenCards[viewscreen.component];
      return <ViewscreenComponent {...this.props} viewscreen={viewscreen} />;
    }
    if (!viewscreen) {
      return <div>No Viewscreen Component for {viewscreen.component}</div>;
    }
  }
  renderPip() {
    const {
      data: { loading, viewscreens },
      clientObj
    } = this.props;
    if (loading || !viewscreens) return null;
    const viewscreen = viewscreens.find(v => v.id === clientObj.id);
    if (!viewscreen) return null;
    if (!viewscreen.pictureInPicture) return null;
    const pip = viewscreen.pictureInPicture;
    if (ViewscreenCards[pip.component]) {
      const ViewscreenComponent = ViewscreenCards[pip.component];
      return (
        <div
          className={`viewscreen-picture-in-picture pip-size-${
            pip.size
          } pip-position-${pip.position}`}
        >
          <ViewscreenComponent
            {...this.props}
            viewscreen={{ ...pip, data: JSON.stringify(pip.data) }}
          />
        </div>
      );
    }
    return null;
  }
  render() {
    if (this.props.component) return this.renderComponent();
    if (!this.props.data) return null;

    return (
      <Fragment>
        {this.props.clientObj.soundPlayer && (
          <SoundPlayer {...this.props} invisible />
        )}
        <SubscriptionHelper
          subscribe={() => {
            return this.props.data.subscribeToMore({
              document: VIEWSCREEN_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  viewscreens: subscriptionData.data.viewscreensUpdate
                });
              }
            });
          }}
        />
        {this.renderComponent()}
        {this.renderPip()}
      </Fragment>
    );
  }
}

const VIEWSCREEN_QUERY = gql`
  query Viewscreens($simulatorId: ID) {
    viewscreens(simulatorId: $simulatorId) {
      id
      name
      component
      data
      pictureInPicture {
        data
        size
        position
        component
      }
    }
  }
`;
export default graphql(VIEWSCREEN_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Viewscreen));
