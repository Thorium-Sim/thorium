import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Table} from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';

const INTERNAL_SUB = gql`
query CrewUpdate($id: ID){
  crewUpdate(simulatorId: $id) {
    id
    firstName
    lastName
    position
    age
    rank
    gender
  }
}`;

class InternalComm extends Component {
  constructor(props){
    super(props);
    this.sub = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: INTERNAL_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ crew: subscriptionData.data.crewUpdate }).toJS();
        }
      });
    }
  }
  _importCrew = (evt) => {
    const self = this;
    const simulatorId = this.props.simulator.id;
    const files = evt.target.files;
    const reader = new FileReader();
    reader.onload = function() {
      const csv = this.result.split('\n');
      if (csv[0] !== 'firstName,lastName,gender,age,rank,position') {
        alert('Invalid CSV file.');
        return;
      }
      const crew = csv.slice(1).map(c => {
        const obj = c.split(',');
        return {
          simulatorId,
          firstName: obj[0],
          lastName: obj[1],
          gender: obj[2],
          age: parseInt(obj[3], 10),
          rank: obj[4],
          position: obj[5]
        }
      })
      const mutation = gql`
      mutation AddCrew($crew: CrewInput) {
        addCrewmember(crew: $crew)
      }`;
      crew.forEach(c => {
        self.props.client.mutate({
          mutation,
          variables: {
            crew: c
          }
        })
      })
    }
    reader.readAsText(files[0]);
  }
  render(){
    if (this.props.data.loading) return null;
    const crew = this.props.data.crew || [];
    return <div className="crew-core" style={{height: '100%', position: 'relative'}}>
    <input type="file" onChange={this._importCrew} />
    {crew.length > 0 && 
      <Table style={{height: 'calc(100% - 24px)', overflow: 'scroll', display: 'block', position: 'relative'}}>
      <thead>
      <tr>
      <th>First</th>
      <th>Last</th>
      <th>Age</th>
      <th>Sex</th>
      <th>Position</th>
      <th>Rank</th>
      </tr>
      </thead>
      <tbody>
      {
        crew.map(c => (
          <tr key={c.id}>
          <td>{c.firstName}</td>
          <td>{c.lastName}</td>
          <td>{c.age}</td>
          <td>{c.gender}</td>
          <td>{c.position}</td>
          <td>{c.rank}</td>
          </tr>
          ))
      }
      </tbody>
      </Table>
    }
    </div>
  }
}

const CREW_QUERY = gql`
query Crew($id: ID){
  crew(simulatorId: $id) {
    id
    firstName
    lastName
    position
    age
    rank
    gender
  }
}`;
export default graphql(CREW_QUERY, {
  options: (ownProps) => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(InternalComm));