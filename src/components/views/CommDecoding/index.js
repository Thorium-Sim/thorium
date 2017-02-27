import React, {Component} from 'react';
import { Layer, Line, Stage } from 'react-konva';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';

const DECODING_SUB = gql`
subscription LRDecoding($simulatorId: ID!) {
  longRangeCommunicationsUpdate(simulatorId: $simulatorId) {
    id
    simulatorId
    name
    messages {
      id
      a
      f
      ra
      rf
      sender
      message
      decodedMessage
      datestamp
    }
  }
}
`;

const height = 300;
const width = 700;
const sinPoints = ({
  a,
  f,
  p,
  animate
}) => {
  let sinWidth = width * 2 * 2;
  if (animate) {
    sinWidth = width / 4 * 2
  }
  return Array(sinWidth).fill(0).map((_, i) => {
    if (animate && i % 2 === 0) return i / 2 + p / 2;
    if (i % 2 === 0) return i / 2;
    if (animate) i += p;
    return Math.sin(i / 2 / f) * a + (height / 2);
  })
}
const decodePoints = ({message, decodeProgress, ra, rf}) => {
  const newDecodeProgress = width / message.length * 2 * decodeProgress;
  let sinWidth = width / 8 * 2;
  return Array(sinWidth).fill(0).map((_, i) => {
    if (i % 2 === 0) return i / 2 + newDecodeProgress / 2;
    i += newDecodeProgress;
    return Math.sin(i / 2 / rf) * ra + (height / 2);
  })
}

class Decoding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 20,
      f: 10,
      p: width / 2 * -1,
      ra: 30,
      rf: 20,
      message: "This is my really long testing testing 123 test message. It represents a message which might be given to the captain and crew during their flight and would be great cause for celebration when it is recieved. ",
      decodedMessage: "",
      decodeProgress: null
    }
    this.decodeSubscription = null;
  }
  componentDidMount() {
    requestAnimationFrame(() => {
      this.loop()
    });
  }
    componentWillReceiveProps(nextProps) {
    if (!this.decodeSubscription && !nextProps.data.loading) {
      this.decodeSubscription = nextProps.data.subscribeToMore({
        document: DECODING_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({longRangeCommunications: subscriptionData.data.longRangeCommunicationsUpdate}).toJS();
        },
      });
    }
  }
  decode() {
    let {
      decodeProgress,
      decodedMessage,
      message,
      a,
      f,
      ra,
      rf
    } = this.state;
    if (!decodeProgress){
      decodeProgress = 0;
      decodedMessage = '';
    }
    if (decodeProgress < message.length) {
      decodeProgress += 1;
      // Deterministic function to figure out the char code.
      // Char codes go from 32 to 126
      // Get the adjuster
      decodedMessage = decodedMessage.split();
      const adjuster = (Math.round(Math.sin(decodeProgress * a + f) * ra + rf) + message.length) % 94 + 32;
      debugger;
      if (a === ra && f === rf) {
        decodedMessage[decodeProgress]  = message[decodeProgress - 1];
      } else {
      decodedMessage[decodeProgress] = String.fromCharCode(adjuster);
        }
      this.setState({
        decodedMessage: decodedMessage.join(''),
        decodeProgress
      });
      setTimeout(this.decode.bind(this), 50)
    } else {
      this.setState({
        decodeProgress: null
      })
    }
  }
  loop() {
    const newP = this.state.p + 20;
    if (newP < width * 2) {
      this.setState({
        p: newP
      })
    } else {
      this.setState({
        p: width / 2 * -1
      })
    }

    // Next frame
    requestAnimationFrame(() => {
      this.loop()
    });
  }
  randomMessage() {
    //Create a random number within the needed bounds
    this.setState({
      ra: (Math.round(Math.random() * 20 - 1) * 5 + 10),
      rf: (Math.round(Math.random() * 10 - 1) * 5 + 5)
    })
  }
  render() {
    const {
      decodeProgress,
      ra,
      rf,
      p,
      decodedMessage,
    } = this.state;
    return <div>
      <div style={{backgroundColor: 'white'}}>
         <input min={10} step={5} max={100} value={this.state.a} type="range" onChange={(e) => {this.setState({a: parseInt(e.target.value,10)})}} />
         <input min={5} step={5} max={50} value={this.state.f} type="range" onChange={(e) => {this.setState({f: parseInt(e.target.value,10)})}} />
        <button onClick={this.randomMessage.bind(this)}>Random</button>
        <button onClick={this.decode.bind(this)}>decode</button>
      </div>
      <Stage width={width} height={height}>
        <Layer>
            <Line
              points={sinPoints(this.state)}
              stroke='red'
              strokeWidth={2}
              lineJoin="round"
              lineCap="round"
              />
          <Line
              points={decodeProgress ? decodePoints(this.state) : sinPoints({f: rf, a: ra, p: p, animate: true})}
              stroke={decodeProgress ? 'magenta' : 'yellow'}
              strokeWidth={2}
              lineJoin="round"
              lineCap="round"
              />
        </Layer>
      </Stage>
      <div style={{color: 'black', background: 'white', position: 'absolute', right: 0, top: 0, width: '300px', height: '300px'}}>{decodedMessage}</div>
    </div>
  }
}

const DECODING_QUERY = gql`
query LRDecoding($simulatorId: ID){
  longRangeCommunications(simulatorId: $simulatorId, crew: true){
    id
    simulatorId
    name
    messages {
      id
      a
      f
      ra
      rf
      sender
      message
      decodedMessage
      datestamp
    }
  }
}
`;
export default  graphql(DECODING_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(Decoding));
