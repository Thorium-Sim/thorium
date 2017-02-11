import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import { Col, Row, Card, Button, ButtonGroup, FormGroup, Label, Input } from 'reactstrap';
import TimelineConfig from './TimelineConfig';

const MISSION_SUB = gql`
subscription MissionSubscription {
  missionsUpdate {
    id
    name
    description
    timeline {
      id
      name
      description
      order
      timelineItems {
        id
        name
        type
        event
        args
        delay
      }
    }
    simulators {
      id
      name
      timeline {
        id
        name
        description
        order
        timelineItems {
          id
          name
          type
          event
          args
          delay
        }
      }
    }
  }
}`;


class MissionsConfig extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedMission: null,
      missionCreateModal: false,
      selectedSimulator: null,
    };
    this.missionSubscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.missionSubscription && !nextProps.data.loading) {
      this.missionSubscription = nextProps.data.subscribeToMore({
        document: MISSION_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          previousResult.missions = subscriptionData.data.missionsUpdate
          return previousResult;
        },
      });
    }
  }
  _setSelectedMission(mission){
    this.setState({
      selectedMission: mission.id,
      selectedSimulator: null
    });
  }
  _setSelectedSimulator(simulator) {
    this.setState({
      selectedSimulator: simulator.id
    });
  }
  _createMission(){
    let name  = prompt('What is the mission name?');
    if (name){
      this.props.client.mutate({
        mutation: gql`
        mutation AddMission($name: String!) {
          createMission(name: $name)
        }`,
        variables: {name},
      });
    }
  }
  _removeMission(){
    let mission = this.state.selectedMission;
    if (mission){
      if (confirm("Are you sure you want to delete that mission?")){
        this.props.client.mutate({
          mutation: gql`
          mutation RemoveMission($id: ID!) {
            removeMission(missionId: $id)
          }
          `,
          variables: {id: mission},
        });
      }
      this.setState({
        selectedMission: null,
        selectedSimulator: null
      });
    }
  }
  _updateMission(type, e){
    const missionId = this.state.selectedMission;
    const { value } = e.target;
    const obj = { missionId };
    obj[type] = value;
    this.props.client.mutate({
      mutation: gql`mutation EditMission($missionId: ID!, $name: String, $description: String, $simulators: [String]) {
        editMission(missionId: $missionId, name: $name, description: $description, simulators: $simulators)
      }`,
      variables: obj,
    });
  }
  _createSimulator(){
    const missionId = this.state.selectedMission;
    const name = prompt('What is the name of the simulator?', 'USS Voyager');
    if (name){
      this.props.client.mutate({
        mutation: gql`mutation AddSimulatorToMission($missionId: ID!, $name: String!){
          addSimulatorToMission(missionId: $missionId, simulatorName: $name)
        }`,
        variables: {missionId, name}
      })
    }
  }
  _removeSimulator(simulatorId){

  }
  _showImportModal(){

  }
  render(){
    return <div>
    {this.props.data.loading ? <p>Loading...</p> :
      <Row>
      <Col sm="2">
      <h5>Missions Config</h5>
      <Card className="scroll">
      {this.props.data.missions.map((e) => {
        return <li key={e.id} onClick={this._setSelectedMission.bind(this,e)} className={`${(e.id === this.state.selectedMission) ? 'selected' : ''} list-group-item`}>{e.name}</li>;
      })}
      </Card>
      <ButtonGroup>
      <Button onClick={this._createMission.bind(this)} size="sm" color="success">Add</Button>
      <Button onClick={this._showImportModal.bind(this)} size="sm" color="warning">Import</Button>
      {this.state.selectedMission && <Button onClick={this._removeMission.bind(this)} size="sm" color="danger">Remove</Button>}
      </ButtonGroup>
      </Col>
      {this.state.selectedMission && 
        <Col sm="2">
        <h5>Simulator Selection</h5>
        <Card className="scroll">
        <li onClick={this._setSelectedSimulator.bind(this,{id: 'mission'})} className={`${(this.state.selectedSimulator === 'mission') ? 'selected' : ''} list-group-item`}>Mission Config</li>
        {this.props.data.missions
          .find(m => m.id === this.state.selectedMission)
          .simulators.map(s => {
            return <li key={s.id} onClick={this._setSelectedSimulator.bind(this,s)} className={`${(s.id === this.state.selectedSimulator) ? 'selected' : ''} list-group-item`}>{s.name}</li>; 
          })}
          </Card>
          <ButtonGroup>
          <Button onClick={this._createSimulator.bind(this)} size="sm" color="success">Add</Button>
          {this.state.selectedSimulator && this.state.selectedSimulator !== 'mission' && <Button onClick={this._removeSimulator.bind(this)} size="sm" color="danger">Remove</Button>}
          </ButtonGroup>
          </Col>
        }
        {this.state.selectedSimulator && 
          <Col sm="8">
          {(() => {
            if (this.state.selectedSimulator === 'mission'){
              const mission = this.props.data.missions.find(m => m.id === this.state.selectedMission);
              return <div>
              <h5>Mission Config</h5>
              <FormGroup>
              <Label>Mission Name</Label>
              <Input type="text" value={mission.name} onChange={this._updateMission.bind(this, 'name')} />
              </FormGroup>
              <FormGroup>
              <Label>Mission Description</Label>
              <Input type="textarea" value={mission.description} name="text" onChange={this._updateMission.bind(this, 'description')} />
              </FormGroup>
              <TimelineConfig
              type="mission"
              object={mission}
              config={this.props.config}
              client={this.props.client}
              />
              </div>
            } else {
              return <div>
              <h5>Simulator Config</h5>
              <TimelineConfig
              type="simulator"
              object={this.props.data.missions.find(m => m.id === this.state.selectedMission).simulators.find(s => s.id === this.state.selectedSimulator)}
              config={this.props.config}
              client={this.props.client}
              />
              </div>
            }
          })()}
          </Col>
        }
        </Row>
      }
      </div>;
    }
  }

  const MissionsConfigQuery = gql `
  query MissionsQuery {
    missions {
      id
      name
      description
      timeline {
        id
        description
        name
        order
        timelineItems {
          id
          args
          delay
          event
          name
          type
        }
      }
      simulators {
        id
        name
        timeline {
          id
          description
          name
          order
          timelineItems {
            id
            args
            delay
            event
            name
            type
          }
        }
      }
    }
  }
  `;
  export default graphql(MissionsConfigQuery, {})(withApollo(MissionsConfig));
