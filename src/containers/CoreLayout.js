import GoldenLayout from 'golden-layout';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';
import React, {Component} from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import moment from 'moment';
import Immutable from 'immutable';
import { Cores } from '../components/views';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

window.ReactDOM = ReactDOM;
window.React = React;
var config = {
  content: [{
    type: 'row',
    content: [
    {
      title: 'A react component',
      type:'react-component',
      component: 'testItem',
      props: {value: 'I\'m on the left'}
    },
    {
      title: 'Another react component',
      type:'react-component',
      component: 'testItem'
    },
    {
      title: 'Another react component',
      type:'react-component',
      component: 'testItem'
    },
    {
      title: 'Another react component',
      type:'react-component',
      component: 'testItem'
    }
    ]
  }]
};

const FLIGHT_SUB = gql`subscription FlightsChanged {
  flightsUpdate {
    id
    name
    date
    simulators {
      id
      name
    }
  }
}`;

class CoreLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      flight: localStorage.getItem('thorium_coreFlight') || '',
      simulator: localStorage.getItem('thorium_coreSimulator') || '',
      layout: localStorage.getItem('thorium_coreLayout') || 'default',
      editable: false,
    };
    this.coreSubscription = null;
    this.flightSubscription = null;
  }
  componentWillReceiveProps(nextProps) {
    /*if (!this.coreSubscription && !nextProps.data.loading) {
      this.coreSubscription = nextProps.data.subscribeToMore({
        document: CORE_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({coreLayouts: subscriptionData.data.coreLayoutChange}).toJS();
        },
      });
    }*/
    if (!this.flightSubscription && !nextProps.data.loading) {
      this.flightSubscription = nextProps.data.subscribeToMore({
        document: FLIGHT_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({flights: subscriptionData.data.flightsUpdate}).toJS();
        },
      });
    }
  }
  pickLayout(e){
    this.setState({
      layout: e.target.value
    });
    localStorage.setItem('thorium_coreLayout', e.target.value);
  }
  pickFlight(e) {
    this.setState({
      flight: e.target.value
    });
    localStorage.setItem('thorium_coreFlight', e.target.value);
  }
  pickSimulator(e) {
    this.setState({
      simulator : e.target.value
    })
    localStorage.setItem('thorium_coreSimulator', e.target.value);
  }
  componentDidMount() {
    var myLayout = new GoldenLayout( config, findDOMNode(this).querySelector('#core-layout') );

    myLayout.registerComponent( 'testItem', React.createClass({
      getInitialState: function() {
        return { value: this.props.value || 'bla' };
      },
      setValue: function( e ) {
        this.setState({ value: e.target.value });
      },
      setContainerTitle: function() {
        this.props.glContainer.setTitle( this.state.value );
      },
      render: function() {
        return (
          <div>
          <input type="text" value={this.state.value} onChange={this.setValue} />
          <button onClick={this.setContainerTitle}>set title</button>
          </div>
          )
      }
    }));
    myLayout.on('stateChanged', function() {
      console.log(myLayout)
      //debugger;
    })
    myLayout.init();
  }
  render() {
    const {flights} = this.props.data.loading ? {coreLayouts: [], flights: []} : this.props.data;
    const flight = this.state.flight ? flights.find(f => f.id === this.state.flight) : {};
    let simulators = [];
    if (flight){
      simulators = flight.id ? flight.simulators : [];
    }

    return <div className="core">
    <select className="btn btn-success btn-sm" onChange={this.pickFlight.bind(this)} value={this.state.flight}>
      <option>Pick a flight</option>
      <option disabled>-----------</option>
      {
        flights.map(f => (<option key={f.id} value={f.id}>{ `${f.name}: ${moment(f.date).format('MM/DD/YY hh:mma')}` }</option>))
      }
      </select>
      <select className="btn btn-info btn-sm" onChange={this.pickSimulator.bind(this)} value={this.state.simulator}>
      <option>Pick a simulator</option>
      <option disabled>-----------</option>
      <option value="test">Test</option>
      {
        simulators.map(s => (<option key={s.id} value={s.id}>{s.name}</option>))
      }
      </select>
      {/*<select className="btn btn-primary btn-sm" onChange={this.pickLayout.bind(this)} value={this.state.layout}>
      <option>Pick a layout</option>
      <option disabled>-----------</option>
      {
        layout.map(l => l.name)
        .filter(function(item, index, a) {
          return a.indexOf(item) === index;
        }).map(l => { return <option key={l} value={l}>{l}</option>})
      }
      </select>*/}
      <label><input type="checkbox" checked={this.state.editable} onChange={() => {this.setState({editable:!this.state.editable})}} /> Editable</label>{' '}
      {
        this.state.editable && (<select className="btn btn-primary btn-sm" onChange={this.addCore.bind(this)}>
          <option value="cancel">Pick a core</option>
          <option disabled>-----------</option>
          {
            Object.keys(Cores).map((core, index) => <option value={core} key={`${core}-${index}`}>{core}</option>)
          }
          </select>)
      }
    <div id="core-layout" style={{height: '100vh'}}></div>
    </div>
  }
}

const CORE_LAYOUT = gql`
query CoreLayouts{
  flights {
    id
    name
    date
    simulators {
      id
      name
    }
  }
}
`;
export default graphql(CORE_LAYOUT)(withApollo(CoreLayout));