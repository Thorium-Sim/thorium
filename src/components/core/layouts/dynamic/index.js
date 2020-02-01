import React from "react";
import {Cores} from "components/views";
import {Container, Row, Col, Button} from "helpers/reactstrap";
import {
  Mosaic,
  MosaicWindow,
  MosaicWindowContext,
  MosaicContext,
} from "react-mosaic-component";
import Picker from "./picker";
import CoreError from "../coreError";
import "react-mosaic-component/react-mosaic-component.css";
import "./dynamic.scss";
import {capitalCase} from "change-case";
import {FaCodeBranch, FaWindowMaximize, FaTimes} from "react-icons/fa";

const UpdateSelect = ({id, path, mosaic}) => {
  const {mosaicActions} = React.useContext(MosaicContext);
  const update = e => {
    mosaicActions.replaceWith(path || {}, e.target.value);
  };
  return (
    <select
      type="select"
      className="btn btn-primary btn-sm"
      value={id || "select"}
      onChange={update}
    >
      <option value="select" disabled>
        Select a Core
      </option>
      {Object.keys(Cores)
        .sort()
        .map(s => {
          return mosaicComponents(mosaic).indexOf(s) > -1 ? (
            <option key={s} value={s} disabled>{`${capitalCase(
              s,
            )}${" - ✅"}`}</option>
          ) : (
            <option key={s} value={s}>{`${capitalCase(s)}`}</option>
          );
        })}
    </select>
  );
};

const Split = () => {
  const {mosaicWindowActions} = React.useContext(MosaicWindowContext);
  const split = e => {
    mosaicWindowActions.split("Picker-" + Math.random());
  };
  return (
    <div className="mosaic-toolbar-button">
      <FaCodeBranch onClick={split} />
    </div>
  );
};
const Expand = ({path}) => {
  const {mosaicActions} = React.useContext(MosaicContext);
  const expand = e => {
    mosaicActions.expand(path);
  };
  return (
    <div className="mosaic-toolbar-button">
      <FaWindowMaximize onClick={expand} />
    </div>
  );
};
const Remove = ({path}) => {
  const {mosaicActions} = React.useContext(MosaicContext);
  const expand = e => {
    mosaicActions.remove(path);
  };
  return (
    <div className="mosaic-toolbar-button">
      <FaTimes onClick={expand} />
    </div>
  );
};

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
const Dynamic = props => {
  const {mosaic, updateMosaic, clients, simulator, editMode, edit} = props;
  return (
    <Mosaic
      renderTile={(id, path) => {
        return (
          <MosaicWindow
            draggable={edit}
            path={path}
            title={
              edit ? (
                <UpdateSelect
                  mosaic={mosaic}
                  id={id}
                  clients={clients}
                  simulator={simulator}
                  path={path}
                />
              ) : (
                capitalCase(id)
              )
            }
            toolbarControls={[
              <Split key="split-button" mosaic={mosaic} />,
              <Expand path={path} key="expand-button" />,
              <Remove path={path} key="remove-button" />,
            ]}
            createNode={e => e}
          >
            {(() => {
              if (id && id.indexOf("Picker") > -1) {
                return (
                  <Picker components={mosaicComponents(mosaic)} path={path} />
                );
              }
              const Comp = Cores[id] || (() => null);
              return (
                <CoreError>
                  <Comp {...props} />
                </CoreError>
              );
            })()}
          </MosaicWindow>
        );
      }}
      zeroStateView={
        <Container>
          <Row>
            {edit ? (
              <Col sm={12}>
                <h1>No cores loaded</h1>
                <h4>Add a core.</h4>
                <UpdateSelect mosaic={mosaic} />
              </Col>
            ) : (
              <Col sm={12}>
                <h1>No cores loaded</h1>
                <h4>
                  Turn on{" "}
                  <Button color="info" onClick={editMode}>
                    Edit Mode
                  </Button>{" "}
                  to continue
                </h4>
              </Col>
            )}
          </Row>
        </Container>
      }
      value={mosaic}
      onChange={updateMosaic}
      className={"core mosaic   bp3-dark pt-dark"}
    />
  );
};

export default Dynamic;
