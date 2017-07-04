import React from 'react';
import {Button} from 'reactstrap';
import {GenericSystemConfig} from './Generic';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Input, FormGroup, Label } from 'reactstrap';

const ops = {
  addSignal: gql`mutation AddCommSignal($id: ID!, $signal: CommSignalInput!){
    commAddSignal(id: $id, commSignalInput: $signal)
  }`
}

const ShortRangeComm = ({data, client, simulatorId, type}) => {
  const defaultSignals = (which, {id}) => {

  }
  const addSignal = ({id}) => {
    const variables = {
      id,
      signal: {}
    }
    client.mutate({
      mutation: ops.addSignal,
      variables,
      refetchQueries: ['ShortRangeComm']

    })
  }
  const performSpeedUpdate = (id, speeds) => {
    const mutation = ops.updateSpeeds;
    const variables = {
      id,
      speeds
    }
    client.mutate({
      mutation,
      variables,
      refetchQueries: ['Engines']
    })
  }
  if (data.loading) return null;
  const {shortRangeComm, assetFolders} = data;
  const [folders] = assetFolders;
  const {containers} = folders;
  return <div className="shortRangeComm scroll">
  {shortRangeComm.map(e => <div key={e.id}>
    <GenericSystemConfig client={client} simulatorId={simulatorId} type={type} data={{systems: [e]}}>
    <Button size="sm" color="info" onClick={() => defaultSignals('trek', e)}>Default Star Trek</Button>
    {e.signals.map(s => <div key={s.id}>
      <FormGroup>
      <Label style={{display: 'inline-block', marginRight: '5px'}}>Name
      <Input type="text" value={s.name} onChange={(e) => {this.signalUpdate()}} />
      </Label>
      <Label style={{display: 'inline-block', marginRight: '5px'}}>Color
      <Input style={{height: '30px', paddingTop: '0px', paddingBottom: '0px'}}type="color" value={s.color} onChange={(e) => {this.signalUpdate()}} />
      </Label>
      <Label style={{display: 'inline-block', marginRight: '5px'}}>Image
      <Input type="select" value={s.image}>
      {containers.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
      </Input>
      </Label>
      <Label style={{display: 'inline-block', marginRight: '5px'}}>Range Lower
      <Input type="text" value={s.range.lower} onChange={(e) => {this.signalUpdate()}} />
      </Label>
      <Label style={{display: 'inline-block', marginRight: '5px'}}>Range Upper
      <Input type="text" value={s.range.upper} onChange={(e) => {this.signalUpdate()}} />
      </Label>
      </FormGroup>
      </div>)
  }
  <Button size="sm" color="success" onClick={() => addSignal(e)}>Add Signal</Button>
  </GenericSystemConfig>
  </div>)}
  </div>
}

const SYSTEM_QUERY = gql`
query ShortRangeComm($id: ID!) {
  shortRangeComm(simulatorId: $id) {
    id
    name
    displayName
    type
    power {
      power
      powerLevels
    }
    signals {
      id
      name
      image
      range {
        lower
        upper
      }
      color
    }
  }
  assetFolders(names: ["Comm Images"]) {
    id
    name
    containers {
      id
      name
      fullPath
    }
  }
}`;

export default graphql(SYSTEM_QUERY, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.simulatorId,
    }
  })
})(ShortRangeComm);