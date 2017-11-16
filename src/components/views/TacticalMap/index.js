import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap";

import "./style.css";

export default class TacticalMapCore extends Component {
  state = {
    activeTab: "1"
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };
  render() {
    return (
      <div className="tacticalmap-core">
        <div className="preview" />
        <div className="right-sidebar">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={this.state.activeTab === "1" ? "active" : ""}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                Layers
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={this.state.activeTab === "2" ? "active" : ""}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Saved Tacticals
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <p>Layers</p>
              <ul className="layer-list" />
              <Button color="success" size="sm">
                Add Layer
              </Button>
              <Button color="warning" size="sm">
                Clear Tactical
              </Button>
            </TabPane>
            <TabPane tabId="2">
              <p>Saved Maps</p>
              <ul className="saved-list" />
              {this.props.dedicated && (
                <Button color="info" size="sm">
                  Duplicate Map
                </Button>
              )}
              <p>Flight Maps</p>
              <ul className="saved-list" />
              <Button color="success" size="sm">
                Save as Template Map
              </Button>
            </TabPane>
          </TabContent>
        </div>
        <div className="bottom-bar" />
      </div>
    );
  }
}
