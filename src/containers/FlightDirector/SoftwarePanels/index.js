import React, { Component } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import uuid from "uuid";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import { Link } from "react-router-dom";
import ComponentLibrary from "./componentLibrary";
import Measure from "react-measure";
import Canvas from "./canvas";
class App extends Component {
  state = {
    edit: true,
    libraryShown: false,
    draggingComponent: null,
    componentLocation: { x: 0, y: 0 },
    components: [],
    connections: [],
    cables: [],
    connectingFrom: null,
    connectingLocation: { x: 0, y: 0 }
  };
  applyUpdate = (data, noupdate) => {
    this.setState(data);
    if (!noupdate) {
      console.log(data);
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
    this.setState(
      {
        components: components.concat(comp)
      },
      () => {
        this.applyUpdate(this.state);
      }
    );
  };
  selectLine = id => {
    this.setState({ selectedLine: id });
  };
  delete = () => {
    if (this.state.selectedLine) {
      this.setState(
        prevState => ({
          connections: prevState.connections.filter(
            c => c.id !== prevState.selectedLine
          ),
          selectedLine: null
        }),
        () => {
          this.applyUpdate(this.state);
        }
      );
    }
  };
  render() {
    const {
      libraryShown,
      selectedLine,
      edit,
      components,
      connections,
      cables,
      draggingComponent,
      componentLocation
    } = this.state;
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
                  {this.state.dimensions && (
                    <Canvas
                      edit={this.state}
                      selectedLine={selectedLine}
                      applyUpdate={this.applyUpdate}
                      components={components}
                      connections={connections}
                      cables={cables}
                      draggingComponent={draggingComponent}
                      componentLocation={componentLocation}
                      selectLine={this.selectLine}
                      update
                      {...this.state.dimensions}
                    />
                  )}
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

const QUERY = gql`
  query SoftwarePanels {
    softwarePanels {
      id
      name
      cables {
        id
        color
        components
      }
      components {
        id
        x
        y
        component
        level
        label
      }
      connections {
        id
        to
        from
      }
    }
  }
`;

export default graphql(QUERY)(App);
