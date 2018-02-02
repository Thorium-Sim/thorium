import React, { Component } from "react";
import * as Components from "./components";
import PageComponent from "./pageComponent";
import DraggingLine from "./draggingLine";
import uuid from "uuid";

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}
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
    document.addEventListener("touchmove", this.cableMovement);
    document.addEventListener("touchend", this.cableUp);
  }
  componentWillUnmount() {
    document.removeEventListener("mousemove", this.cableMovement);
    document.removeEventListener("mouseup", this.cableUp);
    document.removeEventListener("touchmove", this.cableMovement);
    document.removeEventListener("touchend", this.cableUp);
  }
  cableMovement = e => {
    if (this.state.draggingCable) {
      const location = {
        x: (e.clientX || e.touches[0].clientX) - this.props.left - 10,
        y: (e.clientY || e.touches[0].clientY) - this.props.top - 10
      };

      this.setState({
        draggingCable: Object.assign({}, this.state.draggingCable, {
          location
        })
      });
    }
  };
  cableUp = e => {
    if (this.state.draggingCable) {
      const adjustedLocation = {
        x:
          ((e.clientX || e.changedTouches[0].clientX) - this.props.left - 10) /
          this.props.width,
        y:
          ((e.clientY || e.changedTouches[0].clientY) - this.props.top - 10) /
          this.props.height,
        z: 0
      };
      const comp = this.props.components.reduce(
        (prev, c) => {
          const dist = distance3d(adjustedLocation, { x: c.x, y: c.y, z: 0 });
          return prev.dist > dist && dist <= 0.02
            ? Object.assign({}, c, { dist })
            : prev;
        },
        { dist: 100 }
      );
      if (e.target.classList.contains("cable") || comp.id) {
        const cableComponents = this.props.cables.reduce((prev, next) => {
          return prev.concat(next.components);
        }, []);
        if (
          cableComponents.indexOf(comp.id || e.target.dataset.component) > -1
        ) {
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
                    comp.id || e.target.dataset.component
                  ]
                })
              }
            )
          );
          this.setState({ draggingCable: null });
        } else {
          this.setState({
            draggingCable: Object.assign({}, this.state.draggingCable, {
              component: comp.id || e.target.dataset.component
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
  dragCable = color => {
    this.setState({
      draggingCable: {
        color,
        location: {
          x: 0,
          y: 0
        }
      }
    });
  };
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
      left,
      top,
      components,
      connections,
      cables,
      draggingComponent,
      componentLocation,
      selectLine,
      selectComponent = () => {},
      selectedComponent
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
            left={left}
            top={top}
            edit={edit}
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
            selectComponent={selectComponent}
            selected={selectedComponent === c.id}
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
