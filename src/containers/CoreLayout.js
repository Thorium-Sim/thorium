import GoldenLayout from 'golden-layout';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-light-theme.css';
import React, {Component} from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import moment from 'moment';
import Immutable from 'immutable';
import { Cores } from '../components/views';
import { graphql, withApollo, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { client } from '../App';
import './CoreLayout.scss';
window.ReactDOM = ReactDOM;
window.React = React;

/*var config = JSON.stringify({
  settings:{
    hasHeaders: true,
    constrainDragToContainer: true,
    reorderEnabled: true,
    selectionEnabled: true,
    popoutWholeStack: false,
    blockedPopoutsThrowError: true,
    closePopoutsOnUnload: true,
    showPopoutIcon: false,
    showMaximiseIcon: true,
    showCloseIcon: true
  },
  content: [{
    type: 'row',
    content: []
  }]
});*/

const CORE_SUB = gql`
subscription CoreSub {
  coreLayoutChange {
    id
    name
    config
  }
}`;

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

class CoreWrapper  extends Component  {
  render() {
    const Comp = Cores[this.props.comp];
    return <ApolloProvider client={client}>
    <Comp {...this.props} />
    </ApolloProvider>
  }
}

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
    this.layout = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.coreSubscription && !nextProps.data.loading) {
      this.coreSubscription = nextProps.data.subscribeToMore({
        document: CORE_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({coreLayouts: subscriptionData.data.coreLayoutChange}).toJS();
        },
      });
    }
    if (!this.flightSubscription && !nextProps.data.loading) {
      this.flightSubscription = nextProps.data.subscribeToMore({
        document: FLIGHT_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({flights: subscriptionData.data.flightsUpdate}).toJS();
        },
      });
    }
    if (!this.layout && !nextProps.data.loading) {
      this.initLayout(nextProps.data.coreLayouts);
    }
  }
  pickLayout(e){
    this.setState({
      layout: e.target.value
    },() => {
      this.initLayout(this.props.data.coreLayouts);
    });
    localStorage.setItem('thorium_coreLayout', e.target.value);
  }
  pickFlight(e) {
    this.setState({
      flight: e.target.value
    },() => {
      this.initLayout(this.props.data.coreLayouts);
    });
    localStorage.setItem('thorium_coreFlight', e.target.value);
  }
  pickSimulator = (e, done) => {
    e.persist();
    this.setState({
      simulator : e.target.value
    },() => {
      this.initLayout(this.props.data.coreLayouts);
    });
    localStorage.setItem('thorium_coreSimulator', e.target.value);
    // Trigger it again for good measure
    if (!done){
      setTimeout(() => {
        this.pickSimulator(e, true);
      }, 100)
    }
  }
  traverseConfig = (config) => {
    if (config.props) {
      config.props = {
        comp: config.props.comp,
        editable: this.state.editable,
        simulator: {id: this.state.simulator},
        objectId: config.props.objectId,
        updateObjectId: () => {this._updateObjectId()}
      }
    }
    if (config.content) {
      config.content = config.content.map(this.traverseConfig);
    }
    return config;
  }
  initLayout(coreLayouts) {
    if (this.layout) {
      this.layout.destroy();
    }
    let config = JSON.parse(coreLayouts.find(s => s.name === this.state.layout).config);
    config = this.traverseConfig(config);
    this.layout = new GoldenLayout( config, findDOMNode(this).querySelector('#core-layout') );
    this.layout.registerComponent('core-wrapper', CoreWrapper);
    
    this.layout.on('stateChanged', (evt) => {
      const mutation = gql`
      mutation UpdateCoreLayout($layout: CoreLayoutInput) {
        updateCoreLayout(layout: $layout)
      }`;
      const variables = {
        layout: {
          id: coreLayouts.find(c => c.name === this.state.layout).id,
          config: JSON.stringify(this.layout.toConfig())
        }
      };
      this.props.client.mutate({
        mutation,
        variables
      });
    });

    this.layout.init();
  }
  addCore(evt) {
    var newItemConfig = {
      type: 'react-component',
      component: 'core-wrapper',
      props: {
        editable: this.state.editable,
        simulator: {id: this.state.simulator},
        comp: evt.target.value
        //objectId: l.objectId
        //updateObjectId={this._updateObjectId.bind(this,l, layout)}
      },
      title: evt.target.value,
    };
    if( this.layout.selectedItem === null ) {
      if (!this.layout.root.contentItems[0]){
        this.layout.root.addChild({
          type: 'row',
          componentName: 'Core',
          activeItemIndex: 1
        });
      }
      this.layout.root.contentItems[0].addChild(newItemConfig);
    } else {
      this.layout.selectedItem.addChild( newItemConfig );
    }
  }
  _updateObjectId(core, layout, objectId){
    layout.find(l => l.i === core.i).objectId = objectId;
    this.props.client.mutate({
      mutation: gql`
      mutation UpdateCoreLayout ($layout: [CoreLayoutInput]){
        updateCoreLayout(layout: $layout)
      }`,
      variables: {
        layout: layout.map(l => {
          return {
            id: l.i,
            x: l.x,
            y: l.y,
            w: l.w,
            h: l.h,
            objectId: l.objectId
          }
        })
        .filter(l => {
          return l.w > 1;
        })
      }
    });
  }
  render() {
    const {coreLayouts, flights} = this.props.data.loading ? {coreLayouts: [], flights: []} : this.props.data;
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
    <select className="btn btn-primary btn-sm" onChange={this.pickLayout.bind(this)} value={this.state.layout}>
    <option>Pick a layout</option>
    <option disabled>-----------</option>
    {
      coreLayouts.map(l => l.name)
      .filter(function(item, index, a) {
        return a.indexOf(item) === index;
      }).map(l => { return <option key={l} value={l}>{l}</option>})
    }
    </select>
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
    <div id="core-layout" style={{height: 'calc(100vh - 80px)'}}></div>
    </div>
  }
}

const CORE_LAYOUT = gql`
query CoreLayouts{
  coreLayouts {
    id
    name
    config
  }
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