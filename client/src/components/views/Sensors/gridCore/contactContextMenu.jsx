import React from "react";
import {
  Input,
  Row,
  Col,
  FormGroup,
  Label,
  Button,
  ButtonGroup,
} from "helpers/reactstrap";
import FileExplorer from "../../TacticalMap/fileExplorer";

const ContactContextMenu = ({
  contact,
  closeMenu,
  destroy,
  updateArmyContact,
}) => {
  const [pickingIcon, setPickingIcon] = React.useState(null);
  const [pickingPicture, setPickingPicture] = React.useState(null);
  const [size, setSize] = React.useState(contact.size);
  //Get the position
  return (
    <div className="contextMenu">
      {pickingIcon && (
        <FileExplorer
          simple
          directory="/Sensor Contacts/Icons"
          selectedFiles={[contact.icon]}
          onClick={(e, container) => {
            setPickingIcon(false);
            updateArmyContact(contact, "icon", container.fullPath);
          }}
        />
      )}
      {pickingPicture && (
        <FileExplorer
          simple
          directory="/Sensor Contacts/Pictures"
          selectedFiles={[contact.picture]}
          onClick={(e, container) => {
            setPickingPicture(false);
            updateArmyContact(contact, "picture", container.fullPath);
          }}
        />
      )}
      {!pickingIcon && !pickingPicture && (
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

                <img
                  alt={"Contact"}
                  style={{
                    width: "100%",
                    minHeight: "20px",
                    minWidth: "20px",
                    maxHeight: "50px",
                    maxWidth: "50px",
                    backgroundColor: "rgba(20,20,50,0.5)",
                  }}
                  src={`/assets${contact.icon}`}
                  className="sensors-contact-army-picture"
                  onClick={() => setPickingIcon(true)}
                />
              </Col>
              <Col sm={6}>
                <Label for="iconSelect">Picture</Label>
                <img
                  alt={"Contact"}
                  style={{
                    width: "100%",
                    minHeight: "20px",
                    maxHeight: "50px",
                    maxWidth: "50px",
                    backgroundColor: "rgba(20,20,50,0.5)",
                  }}
                  src={`/assets${contact.picture}`}
                  className="sensors-contact-army-picture"
                  onClick={() => setPickingPicture(true)}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label for="sizeRange" sm={4}>
              Size ({size})
            </Label>
            <input
              type="range"
              id="sizeRange"
              min="0.1"
              defaultValue={size}
              max="20"
              step="0.1"
              onChange={e => setSize(e.target.value)}
              onMouseUp={e => {
                updateArmyContact(contact, "size", parseFloat(e.target.value));
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
          <FormGroup>
            <Label for="disabled" sm={3}>
              Disabled
            </Label>
            <input
              type="checkbox"
              id="disabled"
              defaultChecked={contact.disabled}
              onChange={e => {
                updateArmyContact(contact, "disabled", e.target.checked);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="hostile" sm={3}>
              Hostile
            </Label>
            <input
              type="checkbox"
              id="hostile"
              defaultChecked={contact.hostile}
              onChange={e => {
                updateArmyContact(contact, "hostile", e.target.checked);
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
};

export default ContactContextMenu;
