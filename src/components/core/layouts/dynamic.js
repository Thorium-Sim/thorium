import React, { Component } from "react";
import { Cores } from "../../views";
import CoreFeed from "../../views/CoreFeed";
import { Container, Row, Col } from "reactstrap";
import {
  Mosaic,
  MosaicWindow,
  MosaicWindowContext,
  RemoveButton,
  ExpandButton,
  createDefaultToolbarButton
} from "react-mosaic-component";
import "react-mosaic-component/react-mosaic-component.css";
import "@blueprintjs/core/dist/blueprint.css";
import "./dynamic.css";

Cores.CoreFeed = CoreFeed;

class UpdateSelect extends React.PureComponent {
  static contextTypes = MosaicWindowContext;
  context;
  update = e => {
    this.context.mosaicActions.replaceWith(
      this.context.mosaicWindowActions
        ? this.context.mosaicWindowActions.getPath()
        : [],
      e.target.value
    );
  };
  render() {
    return (
      <select
        type="select"
        className="btn btn-primary btn-sm"
        value={this.props.id || "select"}
        onChange={this.update}
      >
        <option value="select" disabled>
          Select a Core
        </option>
        {Object.keys(Cores).map(s => (
          <option key={s}>{`${s}${
            mosaicComponents(this.props.mosaic).indexOf(s) > -1 ? " - ✅" : ""
          }`}</option>
        ))}
      </select>
    );
  }
}

class Split extends React.PureComponent {
  static contextTypes = MosaicWindowContext;
  context;
  render() {
    return (
      <div style={{ position: "relative" }}>
        {createDefaultToolbarButton(
          "Split Window",
          "pt-icon-add-column-right",
          () => {}
        )}
        <select
          type="select"
          style={{
            width: "30px",
            height: "30px",
            left: 0,
            position: "absolute",
            zIndex: 5,
            opacity: 0
          }}
          onChange={this.split}
        >
          {Object.keys(Cores).map(s => (
            <option key={s}>{`${s}${
              mosaicComponents(this.props.mosaic).indexOf(s) > -1 ? " - ✅" : ""
            }`}</option>
          ))}
        </select>
      </div>
    );
  }

  split = e => {
    this.context.mosaicWindowActions.split(e.target.value);
  };
}

function mosaicComponents(page) {
  let components = [];
  if (!page) return [];
  if (typeof page.first === "string") {
    components.push(page.first);
  } else {
    components = components.concat(mosaicComponents(page.first));
  }
  if (typeof page.second === "string") {
    components.push(page.second);
  } else {
    components = components.concat(mosaicComponents(page.second));
  }
  return components;
}
class Dynamic extends Component {
  render() {
    return (
      <Mosaic
        renderTile={(id, path) => {
          return (
            <MosaicWindow
              path={path}
              title={<UpdateSelect mosaic={this.props.mosaic} id={id} />}
              toolbarControls={[
                <Split key="split-button" mosaic={this.props.mosaic} />,
                <ExpandButton key="expand-button" />,
                <RemoveButton key="remove-button" />
              ]}
              createNode={e => e}
            >
              {(() => {
                const Comp = Cores[id];
                return <Comp {...this.props} />;
              })()}
            </MosaicWindow>
          );
        }}
        zeroStateView={
          <Container>
            <Row>
              <Col sm={12}>
                <h1>No cores loaded</h1>
                <h4>Add a core.</h4>
                <UpdateSelect mosaic={this.props.mosaic} />
              </Col>
            </Row>
          </Container>
        }
        value={this.props.mosaic}
        onChange={this.props.updateMosaic}
        className={"core mosaic mosaic-blueprint-theme pt-dark"}
      />
    );
  }
}

export default Dynamic;
