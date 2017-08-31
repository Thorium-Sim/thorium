import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import {
  Input,
  Row,
  Col,
  FormGroup,
  Form,
  Label,
  Card,
  CardBlock,
  Button
} from "reactstrap";

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

const ContactContextMenu = props => {
  //Get the position
  const { contact, closeMenu } = props;
  return (
    <div className="contextMenu">
      <Card>
        <CardBlock>
          <Form>
            <Row style={{ margin: 0 }}>
              <Col sm={12}>
                <FormGroup>
                  <Label for="iconSelect" sm={2}>
                    Label
                  </Label>
                  <Input
                    type="text"
                    name="label"
                    id="labelText"
                    defaultValue={contact.name}
                    onChange={e => {
                      const contact = props.contact;
                      props.updateArmyContact(contact, "name", e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="iconSelect" sm={2}>
                    Icon
                  </Label>
                  <Input
                    type="select"
                    name="select"
                    id="iconSelect"
                    defaultValue={contact.icon}
                    onChange={e => {
                      const contact = props.contact;
                      props.updateArmyContact(
                        contact,
                        "icon",
                        `/Sensor Contacts/Icons/${e.target.value}`
                      );
                    }}
                  >
                    {!props.data.loading &&
                      props.data.assetFolders
                        .find(f => f.name === "Icons")
                        .containers.map(icon => {
                          return (
                            <option key={icon.id} value={icon.name}>
                              {icon.name}
                            </option>
                          );
                        })}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={12}>
                <FormGroup>
                  <Label for="pictureSelect" sm={2}>
                    Picture
                  </Label>
                  <Input
                    type="select"
                    name="select"
                    id="pictureSelect"
                    defaultValue={contact.picture}
                    onChange={e => {
                      const contact = props.contact;
                      props.updateArmyContact(
                        contact,
                        "picture",
                        `/Sensor Contacts/Pictures/${e.target.value}`
                      );
                    }}
                  >
                    {!props.data.loading &&
                      props.data.assetFolders
                        .find(f => f.name === "Pictures")
                        .containers.map(picture => {
                          return (
                            <option key={picture.id} value={picture.name}>
                              {picture.name}
                            </option>
                          );
                        })}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={12}>
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
                      const contact = props.contact;
                      props.updateArmyContact(contact, "size", e.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
              {/*<Col sm={4}>
                <FormGroup>
                  <Label for="infraredCheckbox" sm={2}>
                    Infrared
                  </Label>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        id="infraredCheckbox"
                        defaultChecked={contact.infrared}
                        onChange={e => {
                          const contact = props.contact;
                          props.updateArmyContact(
                            contact,
                            "cloaked",
                            e.target.checked
                          );
                        }}
                      />{" "}
                      Shown
                    </Label>
                  </FormGroup>
                </FormGroup>
              </Col>
              <Col sm={4}>
                <FormGroup>
                  <Label for="cloakedCheckbox" sm={2}>
                    Cloaked
                  </Label>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        id="cloakedCheckbox"
                        defaultChecked={contact.cloaked}
                        onChange={e => {
                          const contact = props.contact;
                          props.updateArmyContact(
                            contact,
                            "cloaked",
                            e.target.checked
                          );
                        }}
                      />{" "}
                      Invisible
                    </Label>
                  </FormGroup>
                </FormGroup>
              </Col>
              <Col sm={4}>
                <FormGroup>
                  <Label for="color" sm={2}>
                    Color
                  </Label>
                  <FormGroup>
                    <Label>
                      <Input
                        type="color"
                        id="colorInput"
                        style={{ width: "20px", padding: 0 }}
                        defaultValue={contact.color}
                        onChange={e => {
                          const contact = props.contact;
                          props.updateArmyContact(
                            contact,
                            "color",
                            e.target.value
                          );
                        }}
                      />{" "}
                    </Label>
                  </FormGroup>
                </FormGroup>
              </Col>*/}
            </Row>
          </Form>
          <Button color="info" size="sm" onClick={closeMenu}>
            Close
          </Button>
        </CardBlock>
      </Card>
    </div>
  );
};

export default graphql(ICON_QUERY, {
  options: () => ({ variables: { names: ["Icons", "Pictures"] } })
})(ContactContextMenu);
