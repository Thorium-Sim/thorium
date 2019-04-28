import React, { Component, Fragment } from "react";
import DiagramContext from "./diagramContext";
import propTypes from "prop-types";
import Dragger from "./Dragger";
import calculateValues from "./calculateValues";

class DiagramProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startLibraryDrag: this.dragComponent,
      resetCanvas: () => this.setState({ reset: Math.random() }),
      clearCanvas: () =>
        this.setState(
          {
            components: [],
            connections: [],
            config: {},
            values: {}
          },
          () => this.props.onUpdate && this.props.onUpdate(this.state)
        ),
      components: props.components || [],
      connections: props.connections || [],
      values: props.values || {},
      draggingComponent: null,
      view: {
        x: 0,
        y: 0,
        scale: 1
      },
      reset: 0,
      dimensions: { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 },
      updateSelectedComponent: id => this.setState({ selectedComponent: id }),
      selectedComponent: null,
      updateDimensions: dimensions => this.setState({ dimensions }),
      updatePan: view => {
        this.setState({ view });
      },
      updateComponentPosition: (id, position) =>
        this.setState(
          state => ({
            components: state.components.map(c =>
              c.id === id ? { ...c, position } : c
            )
          }),
          () => this.props.onUpdate && this.props.onUpdate(this.state)
        ),
      removeComponent: id =>
        this.setState(
          state => ({
            components: state.components.filter(c => c.id !== id),
            connections: state.connections.filter(
              c => c.to.id !== id && c.from.id !== id
            ),
            values: calculateValues(
              state.components.filter(c => c.id !== id),
              state.connections.filter(c => c.to.id !== id && c.from.id !== id),
              state.values,
              state.config,
              state.registeredComponents
            )
          }),
          () => this.props.onUpdate && this.props.onUpdate(this.state)
        ),
      addConnection: connection => {
        if (
          this.state.connections.find(
            c =>
              c.to.id === connection.to.id &&
              c.to.nodeId === connection.to.nodeId
          )
        ) {
          return;
        }
        this.setState(
          state => ({
            connections: state.connections.concat(connection),
            values: calculateValues(
              this.state.components,
              state.connections.concat(connection),
              state.values,
              state.config,
              state.registeredComponents
            )
          }),
          () => this.props.onUpdate && this.props.onUpdate(this.state)
        );
      },
      removeConnection: id =>
        this.setState(
          state => ({
            connections: state.connections.filter(c => c.id !== id),
            values: calculateValues(
              this.state.components,
              state.connections.filter(c => c.id !== id),
              state.values,
              state.config,
              state.registeredComponents
            )
          }),
          () => this.props.onUpdate && this.props.onUpdate(this.state)
        ),
      updateValue: (id, value) => {
        this.setState(
          state => ({
            values: calculateValues(
              this.state.components,
              this.state.connections,
              { ...this.state.values, [id]: value },
              state.config,
              state.registeredComponents
            )
          }),
          () => this.props.onUpdate && this.props.onUpdate(this.state)
        );
      },
      config: props.config || {},
      setConfig: (id, key, value) => {
        this.setState(
          state => ({
            values: calculateValues(
              this.state.components,
              this.state.connections,
              this.state.values,
              {
                ...state.config,
                [id]: { ...state.config[id], [key]: value }
              },
              state.registeredComponents
            ),
            config: {
              ...state.config,
              [id]: { ...state.config[id], [key]: value }
            }
          }),
          () => this.props.onUpdate && this.props.onUpdate(this.state)
        );
      },
      registeredComponents: props.registeredComponents
        ? props.registeredComponents.length
          ? props.registeredComponents
          : Object.values(props.registeredComponents)
        : []
    };
  }
  dragComponent = e => {
    const component = e.currentTarget.dataset.component;
    if (!component) {
      throw new Error(
        "Cannot drag a component without the data-component attribute"
      );
    }
    const Comp = this.state.registeredComponents.find(
      c => c.objectKey === component || c.name === component
    );
    if (!Comp) {
      throw new Error("Cannot drag a component that hasn't been registered.");
    }
    this.setState({
      draggingComponent: {
        component: component,
        position: { x: e.clientX, y: e.clientY }
      }
    });
  };

  static propTypes = {
    children: propTypes.node,
    components: propTypes.array,
    connections: propTypes.array,
    values: propTypes.object,
    config: propTypes.object,
    onUpdate: propTypes.func
  };

  render() {
    const { draggingComponent, view, dimensions } = this.state;
    return (
      <Fragment>
        <DiagramContext.Provider value={this.state}>
          {this.props.children}
        </DiagramContext.Provider>
        {draggingComponent && (
          <Dragger
            {...draggingComponent}
            view={view}
            registeredComponents={this.state.registeredComponents}
            canvasDimensions={dimensions}
            removeDragger={() => this.setState({ draggingComponent: null })}
            addComponent={component =>
              this.setState(state => ({
                components: [...state.components, component],
                draggingComponent: null,
                values: calculateValues(
                  [...state.components, component],
                  state.connections,
                  state.values,
                  state.config,
                  state.registeredComponents
                )
              }))
            }
          />
        )}
      </Fragment>
    );
  }
}

export default DiagramProvider;
