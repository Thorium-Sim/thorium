import GoldenLayout from "golden-layout";
import "golden-layout/src/css/goldenlayout-base.css";
import "golden-layout/src/css/goldenlayout-dark-theme.css";
import React, { Component } from "react";
import ReactDOM, { findDOMNode } from "react-dom";
import { Cores } from "../../components/views";
import { graphql, withApollo, ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import IssueTracker from "../../components/admin/IssueTracker";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { client } from "../../App";
import "./CoreLayout.css";
window.ReactDOM = ReactDOM;
window.React = React;

/*var config = JSON.stringify({
  settings:{
    hasHeaders: true,
    constrainDragToContainer: true,
    reorderEnabled: true,
    selectionEnabled: true,
    popoutWholeStack: false,
    blockedPopoutsThrowError: true,
    closePopoutsOnUnload: true,
    showPopoutIcon: false,
    showMaximiseIcon: true,
    showCloseIcon: true
  },
  content: [{
    type: 'row',
    content: []
  }]
});*/

const CORE_SUB = gql`
  subscription CoreSub {
    coreLayoutChange {
      id
      name
      config
    }
  }
`;

class CoreWrapper extends Component {
  render() {
    const Comp = Cores[this.props.comp];
    return (
      <ApolloProvider client={client}>
        <Comp {...this.props} />
      </ApolloProvider>
    );
  }
}

class CoreLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: props.flightId,
      simulator: null,
      layout: localStorage.getItem("thorium_coreLayout") || "default",
      editable: false,
      issuesOpen: false
    };
    this.coreSubscription = null;
    this.layout = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.coreSubscription && !nextProps.data.loading) {
      this.coreSubscription = nextProps.data.subscribeToMore({
        document: CORE_SUB,
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            coreLayouts: subscriptionData.data.coreLayoutChange
          });
        }
      });
    }
    if (!this.layout && !nextProps.data.loading) {
      this.initLayout(nextProps.data.coreLayouts);
    }
    if (!nextProps.data.loading) {
      const { flights } = nextProps.data;
      if (flights) {
        const flight = this.state.flight
          ? flights.find(f => f.id === this.state.flight)
          : {};
        const simulators = flight && flight.id ? flight.simulators : [];
        if (simulators.length === 1) {
          this.pickSimulator({
            target: { value: simulators[0].id }
          });
        }
        if (
          simulators.indexOf(
            s => s.id === localStorage.getItem("thorium_coreSimulator")
          ) > -1
        ) {
          this.pickSimulator({
            target: { value: localStorage.getItem("thorium_coreSimulator") }
          });
          return;
        }
      }
    }
  }
  pickLayout(e) {
    this.setState(
      {
        layout: e.target.value
      },
      () => {
        this.initLayout(this.props.data.coreLayouts);
      }
    );
    localStorage.setItem("thorium_coreLayout", e.target.value);
  }
  pickSimulator = (e, done) => {
    const simulator = e.target.value;
    this.setState(
      {
        simulator
      },
      () => {
        this.initLayout(this.props.data.coreLayouts);
      }
    );
    localStorage.setItem("thorium_coreSimulator", simulator);
    // Trigger it again for good measure
    if (!done) {
      setTimeout(() => {
        this.pickSimulator({ target: { value: simulator } }, true);
      }, 100);
    }
  };
  traverseConfig = config => {
    if (config.props) {
      config.props = {
        comp: config.props.comp,
        editable: this.state.editable,
        simulator: { id: this.state.simulator },
        objectId: config.props.objectId,
        updateObjectId: () => {
          this._updateObjectId();
        }
      };
    }
    if (config.content) {
      config.content = config.content.map(this.traverseConfig);
    }
    return config;
  };
  initLayout(coreLayouts) {
    if (!findDOMNode(this)) return;
    if (this.layout) {
      this.layout.destroy();
    }
    let config = JSON.parse(
      coreLayouts.find(s => s.name === this.state.layout).config
    );
    config = this.traverseConfig(config);
    this.layout = new GoldenLayout(
      config,
      findDOMNode(this).querySelector("#core-layout")
    );
    this.layout.registerComponent("core-wrapper", CoreWrapper);

    this.layout.on("stateChanged", evt => {
      const mutation = gql`
        mutation UpdateCoreLayout($layout: CoreLayoutInput) {
          updateCoreLayout(layout: $layout)
        }
      `;
      const variables = {
        layout: {
          id: coreLayouts.find(c => c.name === this.state.layout).id,
          config: JSON.stringify(this.layout.toConfig())
        }
      };
      this.props.client.mutate({
        mutation,
        variables
      });
    });

    this.layout.init();
  }
  addCore(evt) {
    var newItemConfig = {
      type: "react-component",
      component: "core-wrapper",
      props: {
        editable: this.state.editable,
        simulator: { id: this.state.simulator },
        comp: evt.target.value
        //objectId: l.objectId
        //updateObjectId={this._updateObjectId.bind(this,l, layout)}
      },
      title: evt.target.value
    };
    if (this.layout.selectedItem === null) {
      if (!this.layout.root.contentItems[0]) {
        this.layout.root.addChild({
          type: "row",
          componentName: "Core",
          activeItemIndex: 1
        });
      }
      this.layout.root.contentItems[0].addChild(newItemConfig);
    } else {
      this.layout.selectedItem.addChild(newItemConfig);
    }
  }
  _updateObjectId(core, layout, objectId) {
    layout.find(l => l.i === core.i).objectId = objectId;
    this.props.client.mutate({
      mutation: gql`
        mutation UpdateCoreLayout($layout: [CoreLayoutInput]) {
          updateCoreLayout(layout: $layout)
        }
      `,
      variables: {
        layout: layout
          .map(l => {
            return {
              id: l.i,
              x: l.x,
              y: l.y,
              w: l.w,
              h: l.h,
              objectId: l.objectId
            };
          })
          .filter(l => {
            return l.w > 1;
          })
      }
    });
  }
  toggleIssueTracker = () => {
    this.setState({
      issuesOpen: !this.state.issuesOpen
    });
  };
  render() {
    if (this.props.data.loading) return null;
    const { coreLayouts, flights } = this.props.data;
    if (!coreLayouts || !flights) return null;
    const flight = this.state.flight
      ? flights.find(f => f.id === this.state.flight)
      : {};
    const simulators = flight && flight.id ? flight.simulators : [];
    return (
      <div className="core">
        <select
          className="btn btn-info btn-sm"
          onChange={this.pickSimulator.bind(this)}
          value={this.state.simulator}
        >
          <option>Pick a simulator</option>
          <option disabled>⸺⸺⸺⸺⸺</option>
          <option value="test">Test</option>
          {simulators.map(s => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <select
          className="btn btn-primary btn-sm"
          onChange={this.pickLayout.bind(this)}
          value={this.state.layout}
        >
          <option>Pick a layout</option>
          <option disabled>⸺⸺⸺⸺⸺</option>
          {coreLayouts
            .map(l => l.name)
            .filter(function(item, index, a) {
              return a.indexOf(item) === index;
            })
            .map(l => {
              return (
                <option key={l} value={l}>
                  {l}
                </option>
              );
            })}
        </select>
        <label>
          <input
            type="checkbox"
            checked={this.state.editable}
            onChange={() => {
              this.setState({ editable: !this.state.editable });
            }}
          />{" "}
          Editable
        </label>{" "}
        {this.state.editable && (
          <select
            className="btn btn-primary btn-sm"
            onChange={this.addCore.bind(this)}
          >
            <option value="cancel">Pick a core</option>
            <option disabled>⸺⸺⸺⸺⸺</option>
            {Object.keys(Cores).map((core, index) => (
              <option value={core} key={`${core}-${index}`}>
                {core}
              </option>
            ))}
          </select>
        )}
        <Link to={`/flight/${this.props.flightId}`}>Client Config</Link>
        <a
          href="#"
          onClick={this.toggleIssueTracker}
          style={{ marginLeft: "20px" }}
        >
          Bug Report/Issue Tracker
        </a>
        <div
          id="core-layout"
          style={{
            display: this.state.simulator ? "block" : "none",
            height: "calc(100vh - 26px)"
          }}
        />
        {!this.state.simulator && (
          <ListGroup style={{ maxWidth: "500px" }}>
            {simulators.map(s => (
              <ListGroupItem
                onClick={() => this.pickSimulator({ target: { value: s.id } })}
                key={s.id}
                style={{
                  color: "black",
                  fontSize: "24px"
                }}
              >
                {s.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
        <Modal isOpen={this.state.issuesOpen} toggle={this.toggleIssueTracker}>
          <ModalHeader toggle={this.toggleIssueTracker}>
            Submit a Feature/Bug Report
          </ModalHeader>
          <ModalBody>
            <IssueTracker />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleIssueTracker}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const CORE_LAYOUT = gql`
  query CoreLayouts($id: ID) {
    coreLayouts {
      id
      name
      config
    }
    flights(id: $id) {
      id
      name
      date
      simulators {
        id
        name
      }
    }
  }
`;
export default graphql(CORE_LAYOUT, {
  options: ownProps => ({
    variables: {
      id: ownProps.flightId
    }
  })
})(withApollo(CoreLayout));
