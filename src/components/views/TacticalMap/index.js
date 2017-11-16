import React, { Component } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

import "./style.css";

const TACTICALMAP_SUB = gql`
  subscription TacticalMapUpdate($flightId: ID) {
    tacticalMapsUpdate(flightId: $flightId) {
      id
      name
      flight {
        id
      }
      layers {
        id
        type
        items {
          id
          font
          label
          fontSize
          fontColor
          icon
          size
          speed
          velocity {
            x
            y
            z
          }
          location {
            x
            y
            z
          }
          destination {
            x
            y
            z
          }
          flash
          ijkl
          wasd
        }
        image
        color
        labels
        gridCols
        gridRows
      }
      frozen
      template
    }
  }
`;

class TacticalMapCore extends Component {
  state = {
    tacticalMapId: null
  };
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: TACTICALMAP_SUB,
        variables: {
          flightId: nextProps.flightId
        },
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
  render() {
    if (this.props.data.loading || !this.props.data.tacticalMaps) return null;
    const { tacticalMaps } = this.props.data;
    return (
      <div className="tacticalmap-core">
        <div className="preview" />
        <div className="right-sidebar">
          <Sidebar
            tacticalMapId={this.state.tacticalMapId}
            tacticalMaps={tacticalMaps}
            selectTactical={this.selectTactical}
            {...this.props}
          />
        </div>
        <div className="bottom-bar" />
      </div>
    );
  }
}

const TACTICALMAP_QUERY = gql`
  query TacticalMap($flightId: ID) {
    tacticalMaps(flightId: $flightId) {
      id
      name
      flight {
        id
      }
      layers {
        id
        type
        items {
          id
          font
          label
          fontSize
          fontColor
          icon
          size
          speed
          velocity {
            x
            y
            z
          }
          location {
            x
            y
            z
          }
          destination {
            x
            y
            z
          }
          flash
          ijkl
          wasd
        }
        image
        color
        labels
        gridCols
        gridRows
      }
      frozen
      template
    }
  }
`;

export default graphql(TACTICALMAP_QUERY, {
  options: ownProps => ({
    variables: {
      flightId: ownProps.flightId
    }
  })
})(withApollo(TacticalMapCore));
class Sidebar extends Component {
  state = { activeTab: "1" };
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };
  addTactical = () => {
    const name = prompt("What is the name of the new tactical map?");
    if (name) {
      const mutation = gql`
        mutation NewTactical($name: String!) {
          newTacticalMap(name: $name)
        }
      `;
      const variables = { name };
      this.props.client.mutate({
        mutation,
        variables
      });
    }
  };
  render() {
    const { tacticalMapId, tacticalMaps, selectTactical } = this.props;
    const { activeTab } = this.state;
    const selectedTactical = tacticalMaps.find(t => t.id === tacticalMapId);
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === "1" ? "active" : ""}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Layers
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === "2" ? "active" : ""}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Saved Tacticals
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          {tacticalMapId && (
            <TabPane tabId="1">
              <p>Layers</p>
              <ul className="layer-list">
                {selectedTactical.layers.map(l => <li key={l.id}>{l.name}</li>)}
              </ul>
              <Button color="success" size="sm">
                Add Layer
              </Button>
              <Button color="warning" size="sm">
                Clear Tactical
              </Button>
            </TabPane>
          )}
          <TabPane tabId="2">
            <p>Saved Maps</p>
            <ul className="saved-list">
              {tacticalMaps.filter(t => t.template).map(t => (
                <li
                  key={t.id}
                  className={t.id === tacticalMapId ? "selected" : ""}
                  onClick={() => selectTactical(t.id)}
                >
                  {t.name}
                </li>
              ))}
            </ul>
            {this.props.dedicated && (
              <div>
                <Button color="success" size="sm" onClick={this.addTactical}>
                  New Map
                </Button>
                <Button color="info" size="sm">
                  Duplicate Map
                </Button>
              </div>
            )}
            {!this.props.dedicated && (
              <div>
                <p>Flight Maps</p>
                <ul className="saved-list">
                  {tacticalMaps.filter(t => !t.template).map(t => (
                    <li
                      key={t.id}
                      className={t.id === tacticalMapId ? "selected" : ""}
                      onClick={() => selectTactical(t.id)}
                    >
                      {t.name}
                    </li>
                  ))}
                </ul>
                <Button color="success" size="sm">
                  Save as Template Map
                </Button>
              </div>
            )}
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
