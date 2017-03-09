import uuid from 'uuid';

export default class InternalComm {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.type = 'InternalCommunications';
    this.class = 'InternalComm';
    this.power = params.power || {};
    this.name = params.name || 'Internal Communications';
    this.state = params.state || 'idle'; //One of 'idle', 'connected'
    this.outgoing = params.outgoing || null;
    this.incoming = params.incoming || null;
  }
  connectOutgoing(){
    this.state = 'connected';
    this.incoming = this.outgoing;
  }
  connectIncoming(){
    this.state = 'connected';
    this.outgoing = this.incoming;
  }
  callIncoming(incoming){
    this.incoming = incoming;
  }
  callOutgoing(outgoing){
    this.outgoing = outgoing;
  }
  cancelIncomingCall(){
    this.state = 'idle';
    if (this.outgoing === this.incoming) this.outgoing = null;
    this.incoming = null;
  }
  cancelOutgoingCall(){
    this.state = 'idle';
    if (this.incoming === this.outgoing) this.incoming = null;
    this.outgoing = null;
  }
}