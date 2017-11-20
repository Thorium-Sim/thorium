import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Button } from "reactstrap";
const TACTICALMAP_SUB = gql`
  subscription TacticalMapUpdate {
    tacticalMapsUpdate {
      id
      name
      flight {
        id
      }
      frozen
      template
    }
  }
`;
class TacticalMapConfig extends Component {
  state = {
    tacticalMapId: null
  };
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.tacticalData.loading) {
      this.sub = nextProps.tacticalData.subscribeToMore({
        document: TACTICALMAP_SUB,
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            tacticalMaps: subscriptionData.tacticalMapsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.sub && this.sub();
  }
  selectTactical = tacticalMapId => {
    this.setState({ tacticalMapId });
  };
  selectFlightTactical = tacticalMapId => {
    let { data, updateData } = this.props;
    data = JSON.parse(data);
    updateData(JSON.stringify(Object.assign({}, data, { tacticalMapId })));
  };
  loadTactical = () => {
    const mutation = gql`
      mutation LoadTactical($id: ID!, $flightId: ID!) {
        loadTacticalMap(id: $id, flightId: $flightId)
      }
    `;
    const variables = {
      id: this.state.tacticalMapId,
      flightId: this.props.flightId
    };
    this.props.client
      .mutate({
        mutation,
        variables
      })
      .then(res => this.selectFlightTactical(res.data.loadTacticalMap));
  };
  render() {
    const { tacticalData } = this.props;
    if (tacticalData.loading || !tacticalData.tacticalMaps) return null;
    const { tacticalMaps } = this.props.tacticalData;
    const { tacticalMapId } = this.state;
    const data = JSON.parse(this.props.data);
    const flightTacticalId = data.tacticalMapId;
    return (
      <div className="tacticalmap-config">
        <p>Saved Maps</p>
        <ul className="saved-list">
          {tacticalMaps.filter(t => t.template).map(t => (
            <li
              key={t.id}
              className={t.id === tacticalMapId ? "selected" : ""}
              onClick={() => this.selectTactical(t.id)}
            >
              {t.name}
            </li>
          ))}
        </ul>
        <Button color="primary" size="sm" onClick={this.loadTactical}>
          Load Tactical
        </Button>
        <div>
          <p>Flight Maps</p>
          <ul className="saved-list">
            {tacticalMaps
              .filter(t => t.flight && t.flight.id === this.props.flightId)
              .map(t => (
                <li
                  key={t.id}
                  className={t.id === flightTacticalId ? "selected" : ""}
                  onClick={() => this.selectFlightTactical(t.id)}
                >
                  {t.name}
                </li>
              ))}
          </ul>
          <Button color="success" size="sm">
            Save as Template Map
          </Button>
        </div>
        <p>
          You can click and drag contacts or use WASD/IJKL to move contacts. Use
          the tactical map config screen to update tactical maps further.
        </p>
      </div>
    );
  }
}

const TACTICALMAP_QUERY = gql`
  query TacticalMap {
    tacticalMaps {
      id
      name
      flight {
        id
      }
      frozen
      template
    }
  }
`;

export default graphql(TACTICALMAP_QUERY, {
  name: "tacticalData"
})(withApollo(TacticalMapConfig));
