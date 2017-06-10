import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Input, FormGroup, Form, Label, Card, CardBlock, Button } from 'reactstrap';

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
  const {x, y, contact, closeMenu} = props;
  return (
    <div className="contextMenu" style={{top: y, left: x}}>
    <Card>
    <CardBlock>
    <Form>
    <FormGroup>
    <Label for="iconSelect" sm={2}>Icon</Label>
    <Input type="select" name="select" id="iconSelect" defaultValue={contact.icon} onChange={(e) => {
        const contact = props.contact;
        props.updateArmyContact(contact, 'icon', `/Sensor Contacts/Icons/${e.target.value}`);
    }} >
    {
        !props.data.loading && props.data.assetFolders.find((f) => f.name === 'Icons').containers.map((icon) => {
          return <option key={icon.id} value={icon.name}>{icon.name}</option>
      })
    }
    </Input>
    </FormGroup>
    <FormGroup >
    <Label for="pictureSelect" sm={2}>Picture</Label>
    <Input type="select" name="select" id="pictureSelect" defaultValue={contact.picture} onChange={(e) => {
        const contact = props.contact;
        props.updateArmyContact(contact, 'picture', `/Sensor Contacts/Pictures/${e.target.value}`);
    }} >
    {
        !props.data.loading && props.data.assetFolders.find((f) => f.name === 'Pictures').containers.map((picture) => {
          return <option key={picture.id} value={picture.name}>{picture.name}</option>
      })
    }
    </Input>
    </FormGroup>
    <FormGroup>
    <Label for="sizeRange" sm={2}>Size</Label>
    <input type="range" id="sizeRange" min="0.1" defaultValue={contact.size} max="20" step="0.1"  onChange={(e) => {
        const contact = props.contact;
        props.updateArmyContact(contact, 'size', e.target.value);
    }} />
    </FormGroup>
    <FormGroup >
    <Label for="infraredCheckbox" sm={2}>Infrared</Label>
    <FormGroup check>
    <Label check>
    <Input type="checkbox" id="infraredCheckbox" defaultChecked={contact.infrared} onChange={(e) => {
        const contact = props.contact;
        props.updateArmyContact(contact, 'cloaked', e.target.checked);
    }} />{' '}
    Shown
    </Label>
    </FormGroup>
    </FormGroup>
    <FormGroup>
    <Label for="cloakedCheckbox" sm={2}>Cloaked</Label>
    <FormGroup check>
    <Label check>
    <Input type="checkbox" id="cloakedCheckbox" defaultChecked={contact.cloaked} onChange={(e) => {
        const contact = props.contact;
        props.updateArmyContact(contact, 'cloaked', e.target.checked);
    }} />{' '}
    Invisible
    </Label>
    </FormGroup>
    </FormGroup>
    </Form>
    <Button color="info" size="sm" onClick={closeMenu}>Close</Button>
    </CardBlock>
    </Card>  
    </div>
    )
}

export default  graphql(ICON_QUERY, {
  options: () => ({ variables: { names: ['Icons', 'Pictures'] } }),
})(ContactContextMenu);
