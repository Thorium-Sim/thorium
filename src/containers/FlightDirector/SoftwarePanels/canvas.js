import React, { Component } from "react";
import * as Components from "./components";
import PageComponent from "./pageComponent";
import DraggingLine from "./draggingLine";
import uuid from "uuid";

export default class PanelCanvas extends Component {
  state = {
    draggingCable: null,
    draggingComponent: null,
    connectingFrom: null,
    connectingLocation: { x: 0, y: 0 }
  };
  componentDidMount() {
    document.addEventListener("mousemove", this.cableMovement);
    document.addEventListener("mouseup", this.cableUp);
  }
  componentWillUnmount() {
    document.removeEventListener("mousemove", this.cableMovement);
    document.removeEventListener("mouseup", this.cableUp);
  }
  cableMovement = e => {
    if (this.state.draggingCable) {
      this.setState({
        draggingCable: Object.assign({}, this.state.draggingCable, {
          location: {
            x: e.clientX - this.props.left - 10,
            y: e.clientY - this.props.top - 10
          }
        })
      });
    }
  };
  cableUp = e => {
    if (this.state.draggingCable) {
      if (e.target.classList.contains("cable")) {
        const cableComponents = this.props.cables.reduce((prev, next) => {
          return prev.concat(next.components);
        }, []);
        if (cableComponents.indexOf(e.target.dataset.component) > -1) {
          this.setState({ draggingCable: null });
          return;
        }
        if (this.state.draggingCable.component) {
          const { components, connections, cables } = this.props;
          this.props.applyUpdate(
            Object.assign(
              {},
              { components, connections },
              {
                cables: cables.concat({
                  id: uuid.v4(),
                  color: this.state.draggingCable.color,
                  components: [
                    this.state.draggingCable.component,
                    e.target.dataset.component
                  ]
                })
              }
            )
          );
          this.setState({ draggingCable: null });
        } else {
          this.setState({
            draggingCable: Object.assign({}, this.state.draggingCable, {
              component: e.target.dataset.component
            })
          });
        }
      } else {
        this.setState({ draggingCable: null });
      }
    }
  };
  startConnecting = (evt, id) => {
    evt.preventDefault();
    document.addEventListener("mousemove", this.moveConnection);
    document.addEventListener("mouseup", this.endConnection);
    this.setState({
      connectingFrom: id,
      connectingLocation: {
        x: evt.clientX - this.props.left,
        y: evt.clientY - this.props.top
      }
    });
  };
  moveConnection = evt => {
    this.setState({
      connectingLocation: {
        x: evt.clientX - this.props.left,
        y: evt.clientY - this.props.top
      }
    });
  };
  endConnection = evt => {
    document.removeEventListener("mousemove", this.moveConnection);
    document.removeEventListener("mouseup", this.endConnection);
    const connections = evt.target.dataset.component
      ? this.props.connections.concat({
          id: uuid.v4(),
          to: evt.target.dataset.component,
          from: this.state.connectingFrom
        })
      : this.props.connections;
    this.setState({
      connectingFrom: null
    });
    const { components, cables } = this.props;
    this.props.applyUpdate(
      Object.assign({}, { connections, components, cables })
    );
  };
  updateComponent = (component, noupdate) => {
    let { components, connections, cables } = this.props;
    if (component) {
      components = components.map(c => {
        if (c.id === component.id) return Object.assign({}, c, component);
        return c;
      });
    }
    this.props.applyUpdate(
      Object.assign({}, { components, connections, cables }),
      noupdate
    );
  };
  dragCable = color =>
    this.setState({
      draggingCable: {
        color,
        location: {
          x: 0,
          y: 0
        }
      }
    });
  removeCable = cableId => {
    const { components, connections, cables } = this.props;
    this.props.applyUpdate({
      components,
      connections,
      cables: cables.filter(c => c.id !== cableId)
    });
  };
  removeComponent = id => {
    const { components, connections, cables } = this.props;
    this.props.applyUpdate({
      components: components.filter(c => c.id !== id),
      connections: connections.filter(c => c.to !== id && c.from !== id),
      cables: cables.filter(c => c.components.indexOf(id) === -1)
    });
  };
  render() {
    const { connectingFrom, connectingLocation, draggingCable } = this.state;
    const {
      edit,
      selectedLine,
      width,
      height,
      components,
      connections,
      cables,
      draggingComponent,
      componentLocation,
      selectLine
    } = this.props;
    return (
      <div>
        {draggingCable &&
          (draggingCable.location.x !== 0 &&
            draggingCable.location.y !== 0) && (
            <div
              className={`ready-cable ${draggingCable.color} dragger`}
              style={{
                transform: `translate(${draggingCable.location.x}px, ${
                  draggingCable.location.y
                }px)`
              }}
            />
          )}

        <svg className="connectors">
          {draggingCable &&
            draggingCable.component && (
              <DraggingLine
                width={width}
                height={height}
                components={components}
                connectingFrom={draggingCable.component}
                color={draggingCable.color}
                stroke={4}
                loc={draggingCable.location}
              />
            )}
          {cables.map(c => (
            <DraggingLine
              width={width}
              height={height}
              key={c.id}
              id={c.id}
              components={components}
              connectingFrom={c.components[0]}
              connectingTo={c.components[1]}
              color={c.color}
              onClick={this.removeCable}
              stroke={4}
            />
          ))}
          {edit &&
            connectingFrom && (
              <DraggingLine
                width={width}
                height={height}
                components={components}
                connectingFrom={connectingFrom}
                loc={connectingLocation}
              />
            )}
          {edit &&
            connections.map(c => (
              <DraggingLine
                width={width}
                height={height}
                key={c.id}
                id={c.id}
                selected={selectedLine === c.id}
                onClick={selectLine}
                components={components}
                connectingFrom={c.from}
                connectingTo={c.to}
              />
            ))}
        </svg>

        {components.map(c => (
          <PageComponent
            key={c.id}
            {...c}
            width={width}
            height={height}
            edit={edit}
            cables={cables}
            draggingCable={draggingCable}
            components={components}
            update={this.updateComponent}
            remove={() => this.removeComponent(c.id)}
            connecting={connectingFrom}
            connections={connections
              .filter(conn => conn.to === c.id)
              .map(conn => components.find(comp => comp.id === conn.from))}
            startConnecting={evt => this.startConnecting(evt, c.id)}
            dragCable={this.dragCable}
          />
        ))}

        {draggingComponent &&
          (() => {
            const Comp = Components[draggingComponent];
            return (
              <div
                className={"componentInstance"}
                style={{
                  transform: `translate(${componentLocation.x}px, ${
                    componentLocation.y
                  }px)`
                }}
              >
                <Comp />
              </div>
            );
          })()}
      </div>
    );
  }
}
