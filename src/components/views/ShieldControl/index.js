import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const RAISED_SUB = gql`
subscription ShieldsRaised{
  shieldRaised{
    id
    state
  }
}`;
const LOWERED_SUB = gql`
subscription ShieldsLowered{
  shieldLowered{
    id
    state
  }
}`;

class ShieldControl extends Component {
  constructor(props){
    super(props);

    this.raisedSubscription = null;
    this.loweredSubscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.raisedSubscription && !nextProps.data.loading) {
      this.raisedSubscription = nextProps.data.subscribeToMore({
        document: RAISED_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          previousResult.shields = previousResult.shields.map(shield => {
            if (shield.id === subscriptionData.data.shieldRaised.id){
              shield.state = subscriptionData.data.shieldRaised.state
            } return shield
          })
          return previousResult;
        },
      });
    }
    if (!this.loweredSubscription && !nextProps.data.loading) {
      this.loweredSubscription = nextProps.data.subscribeToMore({
        document: LOWERED_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          previousResult.shields = previousResult.shields.map(shield => {
            if (shield.id === subscriptionData.data.shieldLowered.id){
              shield.state = subscriptionData.data.shieldLowered.state
            } return shield
          })
          return previousResult;
        },
      });
    }
  }
  _toggleShields(){
    if (this.props.data.shields[0].state){
      this.props.lowerShields({id: this.props.data.shields[0].id})
    } else {
      this.props.raiseShields({id: this.props.data.shields[0].id})
    }
  }
  render(){
    console.log(this.props);
    return <div className="container">
    {this.props.data.loading ? "Loading..." : 
    <div>
    <span className={this.props.data.shields[0].state ? 'text-success' : 'text-danger'}>{this.props.data.shields[0].state ? "Shields On!" : "Shields Off!"}</span>
    <button className="btn btn-success" onClick={this._toggleShields.bind(this)}>Toggle Shields</button>
    </div>
  }
  </div>
}
}

const SHIELD_QUERY = gql`
query Shields{
  shields(simulatorId: "test") {
    id
    state
    frequency
    position
    integrity
  }
}
`;
const RAISE_SHIELDS = gql`
mutation RaiseShields($id: ID!){
  shieldRaised(id: $id)
}
`;
const LOWER_SHIELDS = gql`
mutation LowerShields($id: ID!){
  shieldLowered(id: $id)
}
`;
export default compose(
  graphql(SHIELD_QUERY, {
    options: (props) => {console.log('PROPS', props); return ({ variables: { simulatorId:'test' } })},
  }),
  graphql(RAISE_SHIELDS, {name: 'raiseShields',
    props: ({raiseShields}) => ({
      raiseShields: (props) => raiseShields({
        variables: Object.assign(props)
      })
    })
  }),
  graphql(LOWER_SHIELDS, {name: 'lowerShields',
    props: ({lowerShields}) => ({
      lowerShields: (props) => lowerShields({
        variables: Object.assign(props)
      })
    })
  })
  )(ShieldControl);
