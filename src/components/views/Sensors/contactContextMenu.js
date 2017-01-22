import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Col, Input, FormGroup, Form, Label, Card, CardBlock } from 'reactstrap';

const ICON_QUERY = gql`
query AssetFolders ($names: [String]){
    assetFolders(names: $names) {
    id
    name
    containers {
      id
      name
      fullPath
  }
}
}`;

const ContactContextMenu = (props) => {
  //Get the position
  const {x, y, contact} = props;
  return (
    <div className="contextMenu" style={{top: y, left: x}}>
    <Card>
    <h5>Contact Edit</h5>
    <CardBlock>
    <Form>
    <FormGroup row>
    <Label for="iconSelect" sm={2}>Icon</Label>
    <Col sm={10}>
    <Input type="select" name="select" id="iconSelect" defaultValue={contact.icon} onChange={(e) => {
        const contact = props.contact;
        contact.icon = `/Sensor Contacts/Icons/${e.target.value}`;
        props.updateArmyContact(contact);
    }} >
    {
        !props.data.loading && props.data.assetFolders.find((f) => f.name === 'Icons').containers.map((icon) => {
          return <option key={icon.id} value={icon.name}>{icon.name}</option>
      })
    }
    </Input>
    </Col>
    </FormGroup>
    <FormGroup row>
    <Label for="pictureSelect" sm={2}>Picture</Label>
    <Col sm={10}>
    <Input type="select" name="select" id="pictureSelect" defaultValue={contact.picture} onChange={(e) => {
        const contact = props.contact;
        contact.picture = `/Sensor Contacts/Pictures/${e.target.value}`;
        props.updateArmyContact(contact);
    }} >
    {
        !props.data.loading && props.data.assetFolders.find((f) => f.name === 'Pictures').containers.map((picture) => {
          return <option key={picture.id} value={picture.name}>{picture.name}</option>
      })
    }
    </Input>
    </Col>
    </FormGroup>
    <FormGroup row>
    <Label for="sizeRange" sm={2}>Size</Label>
    <Col sm={10}>
    <input type="range" id="sizeRange" min="0.1" defaultValue={contact.size} max="20" step="0.1"  onChange={(e) => {
        const contact = props.contact;
        contact.size = e.target.value;
        props.updateArmyContact(contact);
    }} />
    </Col>
    </FormGroup>
    <FormGroup row>
    <Label for="infraredCheckbox" sm={2}>Infrared</Label>
    <Col sm={{ size: 10 }}>
    <FormGroup check>
    <Label check>
    <Input type="checkbox" id="infraredCheckbox" defaultChecked={contact.infrared} onChange={(e) => {
        const contact = props.contact;
        contact.infrared = e.target.checked;
        props.updateArmyContact(contact);
    }} />{' '}
    Shown
    </Label>
    </FormGroup>
    </Col>
    </FormGroup>
    <FormGroup row>
    <Label for="cloakedCheckbox" sm={2}>Cloaked</Label>
    <Col sm={{ size: 10 }}>
    <FormGroup check>
    <Label check>
    <Input type="checkbox" id="cloakedCheckbox" defaultChecked={contact.cloaked} onChange={(e) => {
        const contact = props.contact;
        contact.infrared = e.target.checked;
        props.updateArmyContact(contact);
    }} />{' '}
    Invisible
    </Label>
    </FormGroup>
    </Col>
    </FormGroup>
    </Form>
    </CardBlock>
    </Card>  
    </div>
    )
}

export default  graphql(ICON_QUERY, {
  options: () => ({ variables: { names: ['Icons', 'Pictures'] } }),
})(ContactContextMenu);
