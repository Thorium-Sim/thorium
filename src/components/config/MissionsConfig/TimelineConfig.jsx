import React, { Component } from 'react';
import { Col, Row, Card, Button, CardBlock, FormGroup, Label, Input } from 'reactstrap';
import MacroWrapper from './MacroConfig';
import gql from 'graphql-tag';

export default class TimelineConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTimelineStep: null,
      selectedTimelineItem: null
    }
  }
  _setSelectedTimelineStep(timeline) {
    this.setState({
      selectedTimelineStep: timeline.id,
      selectedTimelineItem: null
    });
  }
  _setSelectedTimelineItem(timelineStep) {
    this.setState({
      selectedTimelineItem: timelineStep.id
    })
  }
  _updateMacro(type, value) {
    let obj = {
      timelineStepId: this.state.selectedTimelineStep,
      timelineItemId: this.state.selectedTimelineItem
    };
    if (this.props.type === 'mission') {
      obj.missionId = this.props.object.id;
    } else {
      obj.simulatorId = this.props.object.id;
    }
    let timelineItem = {}
    timelineItem[type] = value;
    obj.timelineItem = timelineItem;

    this.props.client.mutate({
      mutation: gql`
      mutation UpdateTimelineItem($simulatorId: ID, $missionId: ID, $timelineStepId: ID!, $timelineItemId: ID!, $timelineItem: TimelineitemInput!){
        updateTimelineStepItem(
        simulatorId: $simulatorId,
        missionId: $missionId, 
        timelineStepId: $timelineStepId,
        timelineItemId: $timelineItemId
        updateTimelineItem: $timelineItem)
      }`,
      variables: obj,
    });
  }
  _updateItem(type, e) {
    let obj = {
      timelineStepId: this.state.selectedTimelineStep,
      timelineItemId: this.state.selectedTimelineItem
    };
    if (this.props.type === 'mission') {
      obj.missionId = this.props.object.id;
    } else {
      obj.simulatorId = this.props.object.id;
    }
    let timelineItem = {}
    timelineItem[type] = e.target.value;
    if (type === 'event') {
      // Reset the args
      timelineItem['args'] = JSON.stringify({});
    }
    obj.timelineItem = timelineItem;

    this.props.client.mutate({
      mutation: gql`
      mutation UpdateTimelineItem($simulatorId: ID, $missionId: ID, $timelineStepId: ID!, $timelineItemId: ID!, $timelineItem: TimelineitemInput!){
        updateTimelineStepItem(
        simulatorId: $simulatorId,
        missionId: $missionId, 
        timelineStepId: $timelineStepId,
        timelineItemId: $timelineItemId
        updateTimelineItem: $timelineItem)
      }`,
      variables: obj,
    });
  }
  _addTimelineStep() {
    const name = prompt("What is the name of the timeline step?");
    const mutation = gql`mutation AddTimelineStep($simulatorId: ID, $missionId: ID, $name: String!, $description: String){
      addTimelineStep(simulatorId: $simulatorId, missionId: $missionId, name: $name, description: $description)
    }`;
    if (name){
      const obj = {
        name
      };
      if (this.props.type === 'mission') {
        obj.missionId = this.props.object.id;
      } else {
        obj.simulatorId = this.props.object.id;
      }
      this.props.client.mutate({
        mutation: mutation,
        variables: obj
      }) 
    }

  }
  _addTimelineItem() {
    const name = prompt("What is the name of the timeline item?");
    const mutation = gql`mutation AddTimelineItem($simulatorId: ID, $missionId: ID, $timelineStepId: ID!, $timelineItem: TimelineitemInput!){
      addTimelineItemToTimelineStep(simulatorId: $simulatorId, missionId: $missionId, timelineStepId: $timelineStepId, timelineItem: $timelineItem)
    }`;
    if (name){
      const obj = {
        timelineStepId: this.state.selectedTimelineStep,
      };
      if (this.props.type === 'mission') {
        obj.missionId = this.props.object.id;
      } else {
        obj.simulatorId = this.props.object.id;
      }
      let timelineItem = {
        name,
        type: 'event'
      }
      obj.timelineItem = timelineItem;
      this.props.client.mutate({
        mutation: mutation,
        variables: obj
      }) 
    }
  }
  render() {
    const {object} = this.props;
    return <Row>
    <Col sm="6" style={ { maxHeight: '27vh' } }>
    <h4>Timeline</h4>
    <Card className="scroll">
    { object.timeline.map((e) => {
     return <li key={ `${e.id}-timelineStep` } onClick={ this._setSelectedTimelineStep.bind(this, e) } className={ `${(e.id === this.state.selectedTimelineStep) ? 'selected' : ''} list-group-item` }>
     { e.name }
     </li>;
   }) }
    <Button color="success" size="sm" block onClick={this._addTimelineStep.bind(this)} >Add Timeline Step</Button>
    </Card>
    </Col>
    { this.state.selectedTimelineStep &&
     <Col sm="6" style={ { maxHeight: '27vh' } }>
     <h4>{ object.timeline.find(e => e.id === this.state.selectedTimelineStep).name }</h4>
     <Card className="scroll">
     { object.timeline.find(e => e.id === this.state.selectedTimelineStep).timelineItems.map((e) => {
       return <li key={ `${object.timeline.find(e => e.id === this.state.selectedTimelineStep)}-${e.id}` } onClick={ this._setSelectedTimelineItem.bind(this, e) } className={ `${(e.name === this.state.selectedTimelineItem) ? 'selected' : ''} list-group-item` }>
       { e.name }
       </li>;
     }) }
     <Button color="success" size="sm" block onClick={this._addTimelineItem.bind(this)} >Add Timeline Item</Button>
     </Card>
     </Col> }
     { (() => {
       if (this.state.selectedTimelineItem) {
         const item = object.timeline.find(e => e.id === this.state.selectedTimelineStep)
         .timelineItems.find(t => t.id === this.state.selectedTimelineItem)
         console.log(item, this.state.selectedTimelineItem);
         return (<Col sm="12">
           <h4>{ item.name }</h4>
           <Card className="scroll" style={ { maxHeight: '27vh' } }>
           <CardBlock>
           <FormGroup>
           <Label>Item Name</Label>
           <Input type="text" value={ item.name } onChange={ this._updateItem.bind(this, 'name') } />
           </FormGroup>
           <FormGroup>
           <Label>Item Type</Label>
           <Input type="text" value={ item.type } onChange={ this._updateItem.bind(this, 'type') } />
           </FormGroup>
           <FormGroup>
           <Label>Item Delay</Label>
           <Input type="number" value={ item.delay } onChange={ this._updateItem.bind(this, 'delay') } />
           </FormGroup>
           <MacroWrapper event={item.event} args={item.args} updateMacro={this._updateMacro.bind(this)} />
           </CardBlock>
           </Card>
           </Col>);
       }
     })() }
     </Row>
   }
 }