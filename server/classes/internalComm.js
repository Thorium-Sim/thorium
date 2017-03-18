import { System } from './generic';

export default class InternalComm extends System {
  constructor(params) {
    super(params);
    this.type = 'InternalComm';
    this.class = 'InternalComm';
    this.name = params.name || 'Internal Communications';
    this.state = params.state || 'idle'; //One of 'idle', 'connected'
    this.outgoing = params.outgoing || null;
    this.incoming = params.incoming || null;
  }
  break(report){
    this.state = 'idle';
    super.break(report);
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