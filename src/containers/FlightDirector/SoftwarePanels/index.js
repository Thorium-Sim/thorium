import React, { Component } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import uuid from "uuid";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import { Link } from "react-router-dom";
import * as Components from "./components";
import ComponentLibrary from "./componentLibrary";
import PageComponent from "./pageComponent";
import DraggingLine from "./draggingLine";
import Measure from "react-measure";
class App extends Component {
  state = {
    edit: true,
    libraryShown: false,
    draggingCable: null,
    draggingComponent: null,
    componentLocation: { x: 0, y: 0 },
    components: [],
    connections: [],
    cables: [],
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
            x: e.clientX - this.state.dimensions.left - 10,
            y: e.clientY - this.state.dimensions.top - 10
          }
        })
      });
    }
  };
  cableUp = e => {
    if (this.state.draggingCable) {
      if (e.target.classList.contains("cable")) {
        const cableComponents = this.state.cables.reduce((prev, next) => {
          return prev.concat(next.components);
        }, []);
        if (cableComponents.indexOf(e.target.dataset.component) > -1) {
          this.setState({ draggingCable: null });
          return;
        }
        if (this.state.draggingCable.component) {
          this.setState({
            cables: this.state.cables.concat({
              id: uuid.v4(),
              color: this.state.draggingCable.color,
              components: [
                this.state.draggingCable.component,
                e.target.dataset.component
              ]
            })
          });
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
  mouseDown = (evt, component) => {
    this.setState({
      libraryShown: false,
      draggingComponent: component,
      componentLocation: {
        x: evt.clientX - this.state.dimensions.left - 12,
        y: evt.clientY - this.state.dimensions.top - 30
      }
    });
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
  };
  mouseMove = evt => {
    const loc = this.state.componentLocation;
    this.setState({
      componentLocation: {
        x: loc.x + evt.movementX,
        y: loc.y + evt.movementY
      }
    });
  };
  mouseUp = () => {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    const {
      components,
      componentLocation: loc,
      draggingComponent
    } = this.state;
    this.setState({
      draggingComponent: null
    });
    if (
      loc.x < 0 ||
      loc.y < 0 ||
      loc.x > this.state.dimensions.width ||
      loc.y > this.state.dimensions.height
    )
      return;
    const comp = {
      id: uuid.v4(),
      component: draggingComponent,
      x: loc.x / this.state.dimensions.width,
      y: loc.y / this.state.dimensions.height
    };
    this.setState({
      components: components.concat(comp)
    });
  };
  updateComponent = component => {
    this.setState(({ components }) => {
      return {
        components: components.map(c => {
          if (c.id === component.id) return Object.assign({}, c, component);
          return c;
        })
      };
    });
  };
  removeComponent = id => {
    this.setState(({ components }) => {
      return { components: components.filter(c => c.id !== id) };
    });
  };
  startConnecting = (evt, id) => {
    evt.preventDefault();
    document.addEventListener("mousemove", this.moveConnection);
    document.addEventListener("mouseup", this.endConnection);
    this.setState({
      connectingFrom: id,
      connectingLocation: {
        x: evt.clientX - this.state.dimensions.left,
        y: evt.clientY - this.state.dimensions.top
      }
    });
  };
  moveConnection = evt => {
    this.setState({
      connectingLocation: {
        x: evt.clientX - this.state.dimensions.left,
        y: evt.clientY - this.state.dimensions.top
      }
    });
  };
  endConnection = evt => {
    document.removeEventListener("mousemove", this.moveConnection);
    document.removeEventListener("mouseup", this.endConnection);
    const connections = evt.target.dataset.component
      ? this.state.connections.concat({
          id: uuid.v4(),
          to: evt.target.dataset.component,
          from: this.state.connectingFrom
        })
      : this.state.connections;
    this.setState({
      connectingFrom: null,
      connections
    });
  };
  selectLine = id => {
    this.setState({ selectedLine: id });
  };
  delete = () => {
    if (this.state.selectedLine) {
      this.setState(prevState => ({
        connections: prevState.connections.filter(
          c => c.id !== prevState.selectedLine
        ),
        selectedLine: null
      }));
    }
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
  renderCanvas({ width, height }) {
    const {
      components,
      componentLocation,
      draggingComponent,
      connectingFrom,
      connectingLocation,
      connections,
      selectedLine,
      edit,
      draggingCable,
      cables
    } = this.state;
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
              components={components}
              connectingFrom={c.components[0]}
              connectingTo={c.components[1]}
              color={c.color}
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
                onClick={this.selectLine}
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
  render() {
    const { libraryShown, selectedLine, edit } = this.state;
    return (
      <Container fluid className="software-panels">
        <Row>
          <Col sm={3}>
            <Link to={"/"}>Go Back</Link>
            {edit && (
              <Button
                size="sm"
                onClick={() => this.setState({ libraryShown: true })}
              >
                Show
              </Button>
            )}
            <Button size="sm" onClick={() => this.setState({ edit: !edit })}>
              {edit ? "Play" : "Edit"}
            </Button>
            {selectedLine && (
              <Button size="sm" onClick={this.delete}>
                Delete
              </Button>
            )}
          </Col>
          <Col sm={9}>
            <Measure
              bounds
              onResize={contentRect => {
                this.setState({ dimensions: contentRect.bounds });
              }}
            >
              {({ measureRef }) => (
                <div className="componentCanvas" ref={measureRef}>
                  <div style={{ paddingTop: `${9 / 16 * 100}%` }} />
                  {this.state.dimensions &&
                    this.renderCanvas(this.state.dimensions)}
                </div>
              )}
            </Measure>
          </Col>
        </Row>
        <ComponentLibrary
          mouseDown={this.mouseDown}
          shown={libraryShown}
          hide={() => this.setState({ libraryShown: false })}
        />
      </Container>
    );
  }
}

export default App;
