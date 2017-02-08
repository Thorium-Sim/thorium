import React, {Component} from 'react';
import ReactGridLayout from 'react-grid-layout';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import { Cores } from '../components/views';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './Core.scss';

const CORE_SUB = gql`
subscription CoreSub {
  coreLayoutChange {
    id
    x
    y
    w
    h
    component
    simulatorId
    name
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

const CoreComponent = (props) => {
  const _removeCore = () => {
    props.client.mutate({
      mutation: gql`
      mutation RemoveCoreLayout ($id: ID){
        removeCoreLayout(id: $id)
      }`,
      variables: {
        id: props.id
      }
    })
  }
  return (
    <div>
    {
      props.editable && <FontAwesome name="ban" className="text-danger pull-right clickable" onClick={_removeCore.bind(this)} />
    }
    {props.children}
    </div>
    );
}

class Core extends Component {
  constructor(props){
    super(props);
    // TODO: Make it so the 'layout' state is set from localStorage
    this.state = {
      flight: null,
      simulator: null,
      layout: 'default',
      editable: false,
    };
    this.coreSubscription = null;
    this.flightSubscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.coreSubscription && !nextProps.data.loading) {
      this.coreSubscription = nextProps.data.subscribeToMore({
        document: CORE_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          previousResult.coreLayouts = subscriptionData.data.coreLayoutChange;
          return previousResult;
        },
      });
    }
    if (!this.flightSubscription && !nextProps.data.loading) {
      this.flightSubscription = nextProps.data.subscribeToMore({
        document: FLIGHT_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Object.assign({}, previousResult);
          returnResult.flights = subscriptionData.data.flightsUpdate;
          return returnResult;
        },
      });
    }
  }
  pickLayout(e){
    this.setState({
      layout: e.target.value
    });
  }
  pickFlight(e) {
    this.setState({
      flight: e.target.value
    })
  }
  pickSimulator(e) {
    this.setState({
      simulator : e.target.value
    })
  }
  changeLayout(layout){
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
          }
        })
        .filter(l => {
          return l.w > 1;
        })
      }
    });
  }
  addCore(e){
    if (e.target.value === 'cancel') return false;
    const name = prompt('What core are you adding this to? (Default: "default")', 'default');
    if (name){
      const layout = {
        simulatorId: 'test',
        name: name,
        x: 1,
        y: 1,
        w: 10,
        h: 5,
        component: e.target.value
      };
      this.props.client.mutate({
        mutation: gql`
        mutation AddCoreLayout ($layout: CoreLayoutInput){
          addCoreLayout(layout: $layout)
        }`,
        variables: {
          layout
        }
      })
    }
  }
  render(){
    const {coreLayouts, flights} = this.props.data.loading ? {coreLayouts: [], flights: []} : this.props.data;
    const layout = coreLayouts.map(l => {
      l.i = l.id;
      return l;
    });
    const simulators = this.state.flight ? flights.find(f => f.id === this.state.flight).simulators : [];
    const renderLayout = layout.filter(l => {
      return l.name === this.state.layout;
    });
    return (
      <div className="core">
      <select className="btn btn-success btn-sm" onChange={this.pickFlight.bind(this)}>
      <option>Pick a flight</option>
      <option disabled>-----------</option>
      {
        flights.map(f => (<option key={f.id} value={f.id}>{ `${f.name}: ${moment(f.date).format('MM/DD/YY hh:mma')}` }</option>))
      }
      </select>
      <select className="btn btn-info btn-sm" onChange={this.pickSimulator.bind(this)}>
      <option>Pick a simulator</option>
      <option disabled>-----------</option>
      <option value="test">Test</option>
      {
        simulators.map(s => (<option key={s.id} value={s.id}>{s.name}</option>))
      }
      </select>
      <select className="btn btn-primary btn-sm" onChange={this.pickLayout.bind(this)}>
      <option>Pick a layout</option>
      <option disabled>-----------</option>
      {
        layout.map(l => l.name)
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
      {
        this.state.simulator && <ReactGridLayout 
        className="layout"
        layout={renderLayout}
        cols={80}
        rowHeight={10}
        width={document.body.clientWidth - 250}
        isDraggable={this.state.editable}
        isResizable={this.state.editable}
        onLayoutChange={this.changeLayout.bind(this)}>
        {
          renderLayout.map(l => {
            const Component = Cores[l.component];
            return (
              <div key={l.i}>
              <CoreComponent id={l.id} client={this.props.client} editable={this.state.editable}>
              <Component simulator={{id: this.state.simulator}} />
              </CoreComponent>
              </div>
              )
          }
          )
        }
        </ReactGridLayout>
      }
      </div>
      );
  }
}
const CORE_LAYOUT = gql`
query CoreLayouts{
  coreLayouts {
    id
    name
    x
    y
    simulatorId
    h
    w
    component
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
export default graphql(CORE_LAYOUT)(withApollo(Core));
