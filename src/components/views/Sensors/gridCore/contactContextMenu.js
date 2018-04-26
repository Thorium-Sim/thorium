import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import {
  Input,
  Row,
  Col,
  FormGroup,
  Label,
  Button,
  ButtonGroup
} from "reactstrap";
import { Asset } from "../../../../helpers/assets";
import FileExplorer from "../../TacticalMap/fileExplorer";

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
    const { contact, closeMenu, destroy, updateArmyContact } = this.props;
    return (
      <div className="contextMenu">
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
                  <Col sm={4}>
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
                  <Col sm={6}>
                    <Label for="iconSelect">Icon</Label>
                    <Asset fail asset={contact.icon}>
                      {({ src }) => (
                        <img
                          alt={"Contact"}
                          style={{
                            width: "100%",
                            minHeight: "20px",
                            minWidth: "20px",
                            maxHeight: "50px",
                            maxWidth: "50px",
                            backgroundColor: "rgba(20,20,50,0.5)"
                          }}
                          src={src}
                          onClick={() => this.setState({ pickingIcon: true })}
                        />
                      )}
                    </Asset>
                  </Col>
                  <Col sm={6}>
                    <Label for="iconSelect">Picture</Label>
                    <Asset fail asset={contact.picture}>
                      {({ src }) => (
                        <img
                          alt={"Contact"}
                          style={{
                            width: "100%",
                            minHeight: "20px",
                            maxHeight: "50px",
                            maxWidth: "50px",
                            backgroundColor: "rgba(20,20,50,0.5)"
                          }}
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
              <FormGroup>
                <Label for="locked" sm={3}>
                  Locked
                </Label>
                <input
                  type="checkbox"
                  id="locked"
                  defaultChecked={contact.locked}
                  onChange={e => {
                    updateArmyContact(contact, "locked", e.target.checked);
                  }}
                />
              </FormGroup>
            </div>
          )}
        <ButtonGroup>
          <Button color="info" size="sm" onClick={closeMenu}>
            Close
          </Button>
          {destroy && (
            <Button color="danger" size="sm" onClick={destroy}>
              Destroy
            </Button>
          )}
        </ButtonGroup>
      </div>
    );
  }
}

export default graphql(ICON_QUERY, {
  options: () => ({ variables: { names: ["Icons", "Pictures"] } })
})(ContactContextMenu);
