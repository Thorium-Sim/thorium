import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import { Col, Row, Card, Button, ButtonGroup, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LayoutList from '../layouts';

class MissionCreateModalView extends Component {
  constructor(props){
    super(props);
    this.state = {
      simulators: []
    }
  }
  createMission() {

  }
  addSimulators(e){
    if (this.state.simulators.indexOf(e.target.value) === -1){
      this.setState({
        simulators: this.state.simulators.concat(e.target.value)
      });
    }
  }
  editName(e){
    this.setState({
      name: e.target.value
    });
  }
  render(){
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} size="large">
      <ModalHeader toggle={this.props.toggle}>Create A New Mission</ModalHeader>
      <ModalBody>
      <Form>
      <FormGroup>
      <Label>Mission Name</Label>
      <Input type="text" onChange={this.editName.bind(this)} />
      </FormGroup>
      {this.props.data.loading ? "Loading..." :
      <FormGroup>
      <Label>Select 1 or more simulators</Label>
      <Input type="select" onChange={this.addSimulators.bind(this)} className="c-select form-control">
      <option value={null}>Select An Option</option>
      {
        this.props.data.simulators.map((data) => {
          return <option key={data.id} value={data.id}>{data.name}</option>;
        })
      }
      </Input>
      </FormGroup>
    }
    </Form>
    <ul>
    {
      this.state.simulators.map((sim) => {
        return <li key={sim}>{ this.props.data.simulators.find((e) => e.id === sim).name }</li>
      })
    }
    </ul>
    </ModalBody>
    <ModalFooter>
    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
    <Button color="primary" onClick={this.createMission}>Create Mission</Button>
    </ModalFooter>
    </Modal>
    );
  }
}

const MissionsSimQuery = gql`
query Simulators{
  simulators(template: true){
    id
    name
  }
}
`;

const MissionCreateModal = graphql(MissionsSimQuery, {})(MissionCreateModalView);

class MissionsConfig extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedMission: null,
      missionCreateModal: false,
    };
  }
  _setSelectedMission(mission){
    this.setState({
      selectedMission: mission.id
    });
  }
  _toggleMissionCreateModal(){
    this.setState({
      missionCreateModal: !this.state.missionCreateModal,
    });
  }
  _createMission(){

  }
  _removeMission(){

  }
  _showImportModal(){

  }
  render(){
    return <Row>
    <Col sm="3">
    <h5>Missions Config</h5>
    <Card className="scroll">
    {this.props.data.loading ? <li>Loading...</li> : this.props.data.missions.map((e) => {
      return <li key={e.id} onClick={this._setSelectedMission.bind(this,e)} className={`${(e.id === this.state.selectedMission) ? 'selected' : ''} list-group-item`}>{e.name}</li>;
    })}
    </Card>
    <ButtonGroup>
    <Button onClick={this._toggleMissionCreateModal.bind(this)} size="sm" color="success">Add</Button>
    <Button onClick={this._showImportModal.bind(this)} size="sm" color="warning">Import</Button>
    <Button onClick={this._removeMission.bind(this)} size="sm" color="danger">Remove</Button>
    </ButtonGroup>
    </Col>
    <Col sm="9">
    <MacroWrapper />
    </Col>
    <MissionCreateModal isOpen={this.state.missionCreateModal} toggle={this._toggleMissionCreateModal.bind(this)} />
    </Row>;
  }
}

class ArgItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {}
    };
    this.Layouts = Object.keys(LayoutList);
  }
  componentWillMount(){
    if (this.props.arg){
      if (this.props.arg.query){
        this.props.client.query({
          query: gql`
          query ArgQuery {
            ${this.props.arg.query}
          }
          `
        }).then((res) => {
          this.setState({
            data: res.data,
          });
        });
      }
    }
  }
  _handleArg(e){
    this.props.handleArg(e.target.value);
  }
  render(){
    const arg = this.props.arg;
    switch(arg.type){
      case "select":
      if (arg.enum){
        return (
          <FormGroup>
          <Label>{arg.content}</Label>
          <Input type="select" onChange={this._handleArg.bind(this)} className="c-select form-control">
          <option value={null}>Select An Option</option>
          {
            arg.enum.map((data) => {
              return <option key={data} value={data}>{data}</option>;
            })
          }
          </Input>
          </FormGroup>
          );
      }
      if (arg.varName){
       return ( <FormGroup>
        <Label>{arg.content}</Label>
        <Input type="select" onChange={this._handleArg.bind(this)} className="c-select form-control">
        <option value={null}>Select An Option</option>
        {
          this[arg.varName].map((data) => {
            return <option key={data} value={data}>{data}</option>;
          })
        }
        </Input>
        </FormGroup>
        );
     }
     return (
      <FormGroup>
      <Label>{arg.content}</Label>
      <Input type="select" onChange={this._handleArg.bind(this)} className="c-select form-control">
      <option value={null}>Select An Option</option>
      {
        this.state.data[arg.queryName] && this.state.data[arg.queryName].map((data) => {
          return <option key={data[arg.key]} value={data[arg.key]}>{data[arg.value]}</option>;
        })
      }
      </Input>
      </FormGroup>
      );
     default:
     return <p key={arg.name}>{`${arg.name} - ${arg.content}`}</p>;
   }
 }
}

class MacroConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMutation: null
    };
  }
  _handleChange(e){
    this.setState({
      selectedMutation: e.target.value,
      mutationArgs: {}
    });
  }
  _handleArg(name, value){
    let {mutationArgs} = this.state;
    mutationArgs[name] = value;
    this.setState({
      mutationArgs: mutationArgs
    });
  }
  runMacro(){
    const macroMutation = gql`mutation ExecuteMacro {
      ${this.state.selectedMutation}(${Object.keys(this.state.mutationArgs).map((arg) => {
        return `${arg}: "${this.state.mutationArgs[arg]}"`;
      })})
    }`;
    this.props.client.mutate({
      mutation: macroMutation
    });
  }
  render(){
    let data;
    if (!this.props.data.loading){
      data = this.props.data.__type.fields;
    }
    return <Row>
    <Col sm="9">
    {this.props.data.loading ? "Loading..." :
    <select onChange={this._handleChange.bind(this)} name="mutations" className="c-select form-control">
    <option>Select a mutation</option>
    {
      data.filter((mutation) => {
        return mutation.description.substr(0,5) === 'Macro';
      }).map((type) => {
        return <option key={type.name} value={type.name}>{type.description}</option>;
      })
    }
    </select>
  }
  {this.state.selectedMutation && <div>
    <h4>{this.state.selectedMutation}</h4>
    {
      data.reduce((prev, next) => {
        if (next.name === this.state.selectedMutation) return next;
        return prev;
      }, {}).args.map((arg) => {
        let argData = {};
        try{
          if (arg.description){
            argData = JSON.parse(arg.description);
          }
        } catch(e){
          argData.content = arg.description;
        }
        argData.name = arg.name;
        return <ArgItem key={arg.name} handleArg={this._handleArg.bind(this, arg.name)} arg={argData} client={this.props.client} />;
      })
    }
    <Button color="primary" onClick={this.runMacro.bind(this)}>Run Macro</Button>
    </div>
  }
  </Col>
  </Row>;
}
}

const MacroConfigQuery = gql `
query IntrospectionQuery {
  __type(name: "RootMutationType") {
    name
    fields {
      name
      description
      args {
        name
        description
      }
    }
  }
}
`;

const MacroWrapper = graphql(MacroConfigQuery, {})(withApollo(MacroConfig));

const MissionsConfigQuery = gql `
query MissionsQuery {
  missions {
    id
    name
    simulators {
      id
      timeline {
        description
        name
        order
        timelineitems {
          args
          delay
          mutation
          name
          type
        }
      }
    }
  }
}
`;
export default graphql(MissionsConfigQuery, {})(withApollo(MissionsConfig));
