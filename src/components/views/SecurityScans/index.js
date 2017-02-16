import React, {Component} from 'react';
import { graphql, withApollo } from 'react-apollo';
import { Row, Col, Button, Input, Card, CardBlock } from 'reactstrap';
import gql from 'graphql-tag';
import moment from 'moment';
import './style.scss';

const SENSOR_SUB = gql`
subscription SensorsChanged {
  sensorsUpdate {
    id
    simulatorId
    scanResults
    scanRequest
    scanning
  }
}`;


class SecurityScans extends Component {
  constructor(props){
    super(props);
    this.sensorsSubscription = null;
    this.state = {
      selectedDeck: 'All Decks',
      selectedRoom: '',
      selectedScanType: 'Standard',
      scanResults: '',
      scanRequest: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.sensorsSubscription && !nextProps.data.loading) {
      this.sensorsSubscription = nextProps.data.subscribeToMore({
        document: SENSOR_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          let returnResult = Object.assign(previousResult);
          returnResult.sensors = returnResult.sensors.map(sensor => {
            if (sensor.id === subscriptionData.data.sensorsUpdate.id){
              return subscriptionData.data.sensorsUpdate;
            } 
            return sensor;
          })
          return returnResult;
        },
      });
    }
    const nextSensors = nextProps.data.sensors[0];
    if (!nextProps.data.loading){
      if (this.props.data.loading){
        //First time load
        //Remove the first line of metadata;
        const request = nextSensors.scanRequest.split("\n");
        request.shift();
        this.setState({
          scanResults:nextSensors.scanResults,
          scanRequest:request.join("\n"),
        })
      } else {
        //Every other load
        if (nextSensors.scanResults !== this.state.scanResults){
          if (this.state.scanResults === undefined){
            this.setState({
              scanResults: nextSensors.scanResults
            });
          } else {
            this.typeIn(nextSensors.scanResults,0,"scanResults");
          }
        }
      }
    }
  }
  _scanRequest() {
    // For now, include the location in the scan request string, not separately.
    if (this.state.scanRequest.trim().length === 0) return;
    let deckName = 'All Decks';
    let roomName = '';
    if (this.state.selectedDeck !== 'All Decks'){
      const deck = this.props.data.decks.find(d => d.id === this.state.selectedDeck);
      deckName = 'Deck ' + deck.number;
      roomName = 'Entire Deck';
      if (this.state.selectedRoom !== '') {
        roomName = deck.rooms.find(r => r.id === this.state.selectedRoom).name;
      }
    }
    const request = `${moment().format('h:mm:ss a')} - ${this.state.selectedScanType} - ${deckName}${roomName && ', '}${roomName}\n${this.state.scanRequest}`
    const obj = {
      id: this.props.data.sensors[0].id,
      request
    };
    this.props.client.mutate({
      mutation: gql`
      mutation SensorScanRequest($id: ID!, $request:String!){
        sensorScanRequest(id:$id, request:$request)
      }`,
      variables: obj
    })
  }
  _stopScan() {
    let obj = {
      id: this.props.data.sensors[0].id,
    };
    this.props.client.mutate({
      mutation: gql`
      mutation CancelScan($id: ID!){
        sensorScanCancel(id:$id)
      }`,
      variables: obj
    })
  }
  typeIn(text,chars,stateProp){
    let currentState = this.state;
    if (text){
      if (text.length >= chars){
        currentState[stateProp] = text.substring(chars,0);
        this.setState(currentState);
        setTimeout(this.typeIn.bind(this,text,chars + 1,stateProp),1);
      }
    }
  }
  _selectDeck(e) {
    this.setState({
      selectedDeck: e.target.value,
      selectedRoom: ''
    });
  }
  _selectRoom(e) {
    this.setState({
      selectedRoom: e.target.value
    });
  }
  _setSelectedScan(type) {
    this.setState({
      selectedScanType: type
    });
  }
  _setScanRequest(e) {
    this.setState({
      scanRequest: e.target.value
    })
  }
  render(){
    if (this.props.data.loading) return null;
    const {scanning} = this.props.data.sensors[0];
    const decks = this.props.data.decks;
    let rooms;
    if (this.state.selectedDeck && this.state.selectedDeck !== 'All Decks'){
      rooms = decks.find(d => d.id === this.state.selectedDeck).rooms;
    }
    return (<Row className="security-scans">
      <Col sm={{size: 6, offset:2}}>
      <Row>
      <h4>Location Select:</h4>
      </Row>
      <Row>
      <Col sm={'auto'}>
      <Input type="select" value={this.state.selectedDeck} onChange={this._selectDeck.bind(this)}>
      <option value="All Decks">All Decks</option>
      {
        decks.map(d => (
          <option 
          key={d.id} 
          value={d.id}>{`Deck ${d.number}`}</option>))
      }
      </Input>
      </Col>
      <Col>
      <Input disabled={!this.state.selectedDeck || this.state.selectedDeck === 'All Decks'} value={this.state.selectedRoom} type="select" onChange={this._selectRoom.bind(this)}>
      <option value="">Entire Deck</option>
      {
        rooms && rooms.map(r => (
          <option 
          key={r.id} 
          value={r.id}>{r.name}</option>))
      }
      </Input>
      </Col>
      </Row>
      <Row style={{marginTop: "20px"}}>
      <h4>Scan Input:</h4>
      </Row>
      <Row>
      <Col>
      <Input type="text" onChange={this._setScanRequest.bind(this)} value={this.state.scanRequest} />
      </Col>
      </Row>
      { scanning ?
        <div>
        <Row>
        <Col sm="auto">
        <Button size="lg" color="danger" onClick={this._stopScan.bind(this)}>Cancel Scan</Button>
        </Col>
        </Row>
        <Row style={{marginTop: "50px"}}>
        <h4 className="text-center">Scan in progress...</h4>
        <Card className="scannerBox">
        <div className="scanner"></div>
        </Card>
        </Row>
        </div>
        :
        <div>
        <Row>
        <Col sm="auto">
        <Button size="lg" onClick={this._scanRequest.bind(this)}>Begin Scan</Button>
        </Col>
        <Col sm="auto">
        <Button color="warning" size="lg">Clear</Button>
        </Col>
        </Row>
        <Row style={{marginTop: "50px"}}>
        <h4>Scan Results:</h4>
        </Row>
        <Row>
        <Col>
        <Card className="results">
        <CardBlock>
        <p>{this.state.scanResults}</p>
        </CardBlock>
        </Card>
        </Col>
        </Row>
        </div>
      }
      </Col>
      <Col sm={{size: 2, offset: 1}}>
      <h4>Scan Type:</h4>
      <Button block onClick={this._setSelectedScan.bind(this, 'Standard')} className={this.state.selectedScanType === 'Standard' ? 'active' : ''}>Standard</Button>
      <Button block onClick={this._setSelectedScan.bind(this, 'Organic')} className={this.state.selectedScanType === 'Organic' ? 'active' : ''}>Organic</Button>
      <Button block onClick={this._setSelectedScan.bind(this, 'Inorganic')} className={this.state.selectedScanType === 'Inorganic' ? 'active' : ''}>Inorganic</Button>
      <Button block onClick={this._setSelectedScan.bind(this, 'Infrared')} className={this.state.selectedScanType === 'Infrared' ? 'active' : ''}>Infrared</Button>
      <Button block onClick={this._setSelectedScan.bind(this, 'Subspace')} className={this.state.selectedScanType === 'Subspace' ? 'active' : ''}>Subspace</Button>
      </Col>
      </Row>)
  }
}

const SENSOR_QUERY = gql`
query GetSensors($simulatorId: ID!){
  sensors (simulatorId: $simulatorId, domain: "internal"){
    id
    simulatorId
    scanResults
    scanRequest
    scanning
  }
  decks(simulatorId: $simulatorId) {
    id
    number
    evac
    doors
    rooms {
      id
      name
      gas
    }
  }
}`;


export default graphql(SENSOR_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(SecurityScans));
