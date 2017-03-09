import uuid from 'uuid';

export default class InternalComm {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.type = 'InternalCommunications';
    this.class = 'InternalComm';
    this.power = params.power || {};
    this.name = params.name || 'Internal Communications';
    this.state = params.state || 'idle'; //One of 'idle', 'calling', 'connected'
    this.outgoing = params.outgoing || null;
    this.incoming = params.incoming || null;
  }
  connectOutgoing(){
    this.state = 'connected';
    this.incoming = null;
  }
  connectIncoming(){
    this.state = 'connected';
    this.outgoing = null;
  }
  callIncoming(incoming){
    this.incoming = incoming;
    this.state = 'calling';
  }
  callOutgoing(outgoing){
    this.outgoing = outgoing;
    this.state = 'calling';
  }
  cancelIncomingCall(){
    this.state = 'idle';
    this.incoming = null;
  }
  cancelOutgoingCall(){
    this.state = 'idle';
    this.outgoing = null;
  }
}