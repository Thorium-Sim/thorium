import React, {Component} from 'react';
import { Alert } from 'reactstrap';

const holderStyle = {
  position: 'absolute',
  right: '20px',
  top: '20px',
  width: '20vw',
  zIndex: '100000',
}
const NOTIFY_SUB = gql`
subscription Notifications($simulatorId: ID!, $station: String){
  notify(simulatorId: $simulatorId, station: $station){
    id
    title
    body
    color
    duration
  }
}`;
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
/*
   title: String
  body: String
  color: String
  trigger: String
  */
  class Alerts extends Component {
    constructor(props){
      super(props);
      this.state = {
        alerts: []
      }
      const self = this;
      this.subscription = this.props.client.subscribe({
        query: NOTIFY_SUB, 
        variables: {simulatorId: this.props.simulator.id, station: this.props.station.name}
      }).subscribe({
        next({notify}) {
          // ... call updateQuery to integrate the new comment
          // into the existing list of comments
          const alerts = self.state.alerts;
          alerts.push(Object.assign(notify, {visible:true}));
          self.setState({
            alerts
          })
          const duration = notify.duration ? notify.duration : 5000
          setTimeout(() => {
            self.onDismiss(notify.id);
          }, duration)
        },
        error(err) { console.error('err', err); },
      });

    }
    onDismiss(id){
      const alerts = this.state.alerts;
      this.setState({
        alerts: alerts.map(a => {
          if (a.id === id) a.visible = false;
          return a;
        })
      })
      setTimeout(() => {
        const alerts = this.state.alerts;
        this.setState({
          alerts: alerts.filter(a => a.id !== id)
        })
      }, 2000)
    }
    render() {
      return <div style={holderStyle} className="alertsHolder">
      {
        this.state.alerts.map(a => <AlertItem key={a.id} notify={a} dismiss={this.onDismiss.bind(this)} />)
      }
      </div>
    }
  }

  const AlertItem = ({dismiss, notify}) => {
    return <Alert color={notify.color} isOpen={notify.visible} toggle={dismiss.bind(this,notify.id)}>
    <h5 className="alert-heading">{notify.title}</h5>
    {notify.body}
    </Alert>
  }
  export default withApollo(Alerts);
