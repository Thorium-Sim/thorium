import React, { Component } from "react";
import ReactGridLayout from "react-grid-layout";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";
import FontAwesome from "react-fontawesome";
import { Cores } from "../../components/views";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./Core.css";

const CORE_SUB = gql`
  subscription CoreSub {
    coreLayoutChange {
      id
      x
      y
      w
      h
      component
      simulatorId
      name
      objectId
    }
  }
`;

const CoreComponent = props => {
  const _removeCore = () => {
    props.client.mutate({
      mutation: gql`
        mutation RemoveCoreLayout($id: ID) {
          removeCoreLayout(id: $id)
        }
      `,
      variables: {
        id: props.id
      }
    });
  };
  return (
    <span>
      {props.editable && (
        <FontAwesome
          name="ban"
          className="text-danger pull-right clickable"
          onClick={_removeCore.bind(this)}
        />
      )}
      {props.children}
    </span>
  );
};

class Core extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: props.flightId,
      simulator: localStorage.getItem("thorium_coreSimulator") || "",
      layout: localStorage.getItem("thorium_coreLayout") || "default",
      editable: false
    };
    this.coreSubscription = null;
    this.flightSubscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.coreSubscription && !nextProps.data.loading) {
      this.coreSubscription = nextProps.data.subscribeToMore({
        document: CORE_SUB,
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            coreLayouts: subscriptionData.coreLayoutChange
          });
        }
      });
    }
  }
  pickLayout(e) {
    this.setState({
      layout: e.target.value
    });
    localStorage.setItem("thorium_coreLayout", e.target.value);
  }
  pickSimulator(e) {
    this.setState({
      simulator: e.target.value
    });
    localStorage.setItem("thorium_coreSimulator", e.target.value);
  }
  changeLayout(layout) {
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
              h: l.h
            };
          })
          .filter(l => {
            return l.w > 1;
          })
      }
    });
  }
  addCore(e) {
    if (e.target.value === "cancel") return false;
    const name = prompt(
      'What core are you adding this to? (Default: "default")',
      "default"
    );
    if (name) {
      const layout = {
        simulatorId: "test",
        name: name,
        x: 0,
        y: 0,
        w: 30,
        h: 20,
        component: e.target.value
      };
      this.props.client.mutate({
        mutation: gql`
          mutation AddCoreLayout($layout: CoreLayoutInput) {
            addCoreLayout(layout: $layout)
          }
        `,
        variables: {
          layout
        }
      });
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
  render() {
    const { coreLayouts, flights } = this.props.data.loading
      ? { coreLayouts: [], flights: [] }
      : this.props.data;
    const layout = coreLayouts.map(l => {
      return Object.assign({}, previousResult, { i: l.id });
    });
    const flight = this.state.flight
      ? flights.find(f => f.id === this.state.flight)
      : {};
    let simulators = [];
    if (flight) {
      simulators = flight.id ? flight.simulators : [];
    }
    const renderLayout = layout.filter(l => {
      return l.name === this.state.layout;
    });
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
          {layout
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
        {this.state.simulator && (
          <ReactGridLayout
            className="layout"
            layout={renderLayout}
            cols={120}
            rowHeight={1}
            width={document.body.clientWidth - 250}
            isDraggable={this.state.editable}
            isResizable={this.state.editable}
            onLayoutChange={this.changeLayout.bind(this)}
          >
            {renderLayout.map(l => {
              const Component = Cores[l.component];
              return (
                <div key={l.i}>
                  <CoreComponent
                    id={l.id}
                    client={this.props.client}
                    editable={this.state.editable}
                  >
                    <Component
                      simulator={{ id: this.state.simulator }}
                      objectId={l.objectId}
                      updateObjectId={this._updateObjectId.bind(
                        this,
                        l,
                        layout
                      )}
                    />
                  </CoreComponent>
                </div>
              );
            })}
          </ReactGridLayout>
        )}
      </div>
    );
  }
}
const CORE_LAYOUT = gql`
  query CoreLayouts {
    coreLayouts {
      id
      name
      x
      y
      simulatorId
      h
      w
      component
      objectId
    }
    flights {
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
export default graphql(CORE_LAYOUT)(withApollo(Core));
