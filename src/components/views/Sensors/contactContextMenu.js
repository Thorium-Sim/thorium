import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Input, Row, Col, FormGroup, Label, Button } from "reactstrap";
import { Asset } from "../../../helpers/assets";
import FileExplorer from "../TacticalMap/fileExplorer";

const ICON_QUERY = gql`
  query AssetFolders($names: [String]) {
    assetFolders(names: $names) {
      id
      name
      containers {
        id
        name
        fullPath
      }
    }
  }
`;

class ContactContextMenu extends Component {
  state = {};
  render() {
    //Get the position
    const { pickingIcon, pickingPicture } = this.state;
    const { contact, closeMenu, updateArmyContact } = this.props;
    return (
      <div className="contextMenu">
        <h5>Contact Config</h5>
        {pickingIcon && (
          <FileExplorer
            directory="/Sensor Contacts/Icons"
            selectedFiles={[contact.icon]}
            onClick={(e, container) => {
              this.setState({ pickingIcon: false });
              updateArmyContact(contact, "icon", container.fullPath);
            }}
          />
        )}
        {pickingPicture && (
          <FileExplorer
            directory="/Sensor Contacts/Pictures"
            selectedFiles={[contact.picture]}
            onClick={(e, container) => {
              this.setState({ pickingPicture: false });
              updateArmyContact(contact, "picture", container.fullPath);
            }}
          />
        )}
        {!pickingIcon &&
          !pickingPicture && (
            <div>
              <FormGroup>
                <Row>
                  <Col sm={2}>
                    <Label for="iconSelect">Label</Label>
                  </Col>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="label"
                      id="labelText"
                      defaultValue={contact.name}
                      onChange={e => {
                        updateArmyContact(contact, "name", e.target.value);
                      }}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm={2}>
                    <Label for="iconSelect">Icon</Label>
                  </Col>
                  <Col sm={2}>
                    <Asset asset={contact.icon}>
                      {({ src }) => (
                        <img
                          src={src}
                          onClick={() => this.setState({ pickingIcon: true })}
                        />
                      )}
                    </Asset>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm={2}>
                    <Label for="iconSelect">Picture</Label>
                  </Col>
                  <Col sm={2}>
                    <Asset asset={contact.picture}>
                      {({ src }) => (
                        <img
                          style={{ width: "100%" }}
                          src={src}
                          onClick={() =>
                            this.setState({ pickingPicture: true })
                          }
                        />
                      )}
                    </Asset>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label for="sizeRange" sm={2}>
                  Size
                </Label>
                <input
                  type="range"
                  id="sizeRange"
                  min="0.1"
                  defaultValue={contact.size}
                  max="5"
                  step="0.1"
                  onChange={e => {
                    updateArmyContact(contact, "size", e.target.value);
                  }}
                />
              </FormGroup>
            </div>
          )}
        <Button color="info" size="sm" onClick={closeMenu}>
          Close
        </Button>
      </div>
    );
  }
}

export default graphql(ICON_QUERY, {
  options: () => ({ variables: { names: ["Icons", "Pictures"] } })
})(ContactContextMenu);
