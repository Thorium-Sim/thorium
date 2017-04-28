import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Container, Row, Col, Button, InputGroup, InputGroupButton } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import { InputField, OutputField } from '../../generic/core';
import Immutable from 'immutable';
import FontAwesome from 'react-fontawesome';

import './style.scss';

const TARGETING_SUB = gql`
subscription TargetingUpdate($simulatorId: ID){
  targetingUpdate(simulatorId: $simulatorId){
    id
    type
    name
    quadrants
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    contacts {
      id
      class
      targeted
    }
    classes {
      id
      name
      size
      icon
      speed
      picture
      quadrant
      iconUrl
      pictureUrl
    }
  }
}`;

class TargetingCore extends Component {
  constructor(props){
    super(props);
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: TARGETING_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ navigation: subscriptionData.data.navigationUpdate }).toJS();
        }
      });
    }
  }
  _addTargetClass(){
    const targeting = this.props.data.targeting[0];
    const {assetFolders} = this.props.data;
    const mutation = gql`
    mutation AddTargetClass($id: ID!, $classInput: TargetClassInput!){
      addTargetClass(id:$id, classInput: $classInput)
    }`;
    const variables = {
      id: targeting.id,
      classInput: {
        name:"Target",
        size:1,
        icon:assetFolders.find(a => a.name === 'Icons').containers[0].fullPath,
        speed:1,
        picture:assetFolders.find(a => a.name === 'Pictures').containers[0].fullPath,
        quadrant:1
      }
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  _setTargetClassCount(targetId, count){
    const targeting = this.props.data.targeting[0];
    const mutation = gql`
    mutation SetTargetClassCount($id: ID!, $classId: ID!, $count: Int!){
      setTargetClassCount(id:$id, classId: $classId, count: $count)
    }`;
    const classId = targetId;
    const variables = {
      id: targeting.id,
      classId,
      count
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  _updateTargetClass(targetId, key, valueArg){
    let value = valueArg;
    if (value.target) {
      value = value.target.value;
    }
    const targeting = this.props.data.targeting[0];
    const mutation = gql`
    mutation UpdateTargetClass($id: ID!, $classInput: TargetClassInput!){
      updateTargetClass(id:$id, classInput: $classInput)
    }`;
    const classInput = {id: targetId};
    classInput[key] = value;
    const variables = {
      id: targeting.id,
      classInput
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  _removeTargetClass(classId){
    const targeting = this.props.data.targeting[0];
    const mutation = gql`
    mutation RemoveTargetClass($id: ID!, $classId: ID!) {
      removeTargetClass(id: $id, classId: $classId)
    }`;
    const variables = {
      id: targeting.id,
      classId
    }
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  _removeTargetedContact(targetId){
    const targeting = this.props.data.targeting[0];
    const mutation = gql`
    mutation RemoveTarget($id: ID!, $targetId: ID!) {
      removeTarget(id: $id, targetId: $targetId)
    }`;
    const variables = {
      id: targeting.id,
      targetId
    }
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render(){
    if (this.props.data.loading) return null;
    const targeting = this.props.data.targeting[0];
    if (!targeting) return <p>No Targeting Systems</p>;
    const {assetFolders} = this.props.data;
    const targetedContact = targeting.contacts.find(t => t.targeted);
    let contactClass, contactId;
    if (targetedContact){
      contactClass = targetedContact.class;
      contactId = targetedContact.id;
    }
    return <Container className="targeting-core">
    <p>Targeting</p>
    <Row>
    <Col sm={6}>
    Targeted System
    </Col>
    <Col sm={6}>
    </Col>
    </Row>
    <Row>
    <Col sm={8}>
    <OutputField alert={targetedContact}>{targetedContact && targetedContact.system}</OutputField>
    </Col>
    <Col sm={4}>
    <Button color="danger" disabled={!targetedContact} size="sm" block onClick={this._removeTargetedContact.bind(this, contactId)}>Destroy</Button>
    </Col>
    </Row>
    <Row>
    <Col sm={3}>Count</Col>
    <Col sm={2}>Move</Col>
    <Col sm={1}>Icon</Col>
    <Col sm={1}>Pic</Col>
    <Col sm={4}>Label</Col>
    <Col sm={1}></Col>
    </Row>
    {
      targeting.classes.map(t => {
        const contactCount = targeting.contacts.filter(c => c.class === t.id).length;
        return <Row>
        <Col sm={3}>
        <InputGroup size="sm">
        <InputGroupButton><Button onClick={this._setTargetClassCount.bind(this, t.id, contactCount - 1)} color="secondary">-</Button></InputGroupButton>
        <InputField 
        style={{lineHeight: '28px',height: '28px', width: '100%'}}
        prompt={'How many targets?'}
        onClick={this._setTargetClassCount.bind(this, t.id)}>{contactCount}</InputField>
        <InputGroupButton><Button onClick={this._setTargetClassCount.bind(this, t.id, contactCount + 1)} color="secondary">+</Button></InputGroupButton>
        </InputGroup>
        </Col>
        <Col sm={2}>
        <Button color="primary" size="sm">On</Button>
        </Col>
        <Col sm={1}>
        <select className="pictureSelect" onChange={this._updateTargetClass.bind(this, t.id, 'icon')} value={t.icon}>
        {
          assetFolders.find(a => a.name === 'Icons').containers.map(c => {
            return <option key={c.id} value={c.fullPath}>{c.name}</option>
          })
        }
        </select>
        <img src={t.iconUrl} role="presentation" />
        </Col>
        <Col sm={1}>
        <select className="pictureSelect" onChange={this._updateTargetClass.bind(this, t.id, 'picture')} value={t.picture}>
        {
          assetFolders.find(a => a.name === 'Pictures').containers.map(c => {
            return <option key={c.id} value={c.fullPath}>{c.name}</option>
          })
        }
        </select>
        <img src={t.pictureUrl} role="presentation" />
        </Col>
        <Col sm={4}>
        <InputField 
        style={{lineHeight: '28px',height: '28px', width: '100%'}}
        prompt={'New target label?'}
        alert={contactClass === t.id}
        onClick={this._updateTargetClass.bind(this, t.id, 'name')}>{t.name}</InputField>
        </Col>
        <Col sm={1}><FontAwesome name="ban" className="text-danger" onClick={this._removeTargetClass.bind(this, t.id)} /></Col>
        </Row>
      })
    }
    <Row>
    <Col sm={12}>
    <Button size={'sm'} block color="success" onClick={this._addTargetClass.bind(this)}>Add Targets</Button>
    </Col>
    </Row>
    </Container>
  }
}

const TARGETING_QUERY = gql`
query Targeting($simulatorId: ID, $names: [String]){
  targeting(simulatorId: $simulatorId){
    id
    type
    name
    quadrants
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    contacts {
      id
      class
      targeted
    }
    classes {
      id
      name
      size
      icon
      speed
      picture
      quadrant
      iconUrl
      pictureUrl
    }
  }
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

export default graphql(TARGETING_QUERY, {
  options: (ownProps) => ({variables: {simulatorId: ownProps.simulator.id, names: ['Icons', 'Pictures']}})
})(withApollo(TargetingCore));
