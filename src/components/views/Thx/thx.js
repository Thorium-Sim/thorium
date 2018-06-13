import React, { Component } from "react";
import { Container } from "reactstrap";

class Thx extends Component {
  constructor(props) {
    super(props);
    const {
      id,
      clients,
      clientObj: { id: clientId }
    } = this.props;
    const client = clients.find(c => c.id === clientId) || {
      id: clientId,
      charge: 0,
      lock: false
    };
    this.state = {
      charge: client.charge
    };
  }
  render() {
    const {
      id,
      clients,
      clientObj: { id: clientId }
    } = this.props;
    const { charge } = this.state;
    const { lock } = clients.find(c => c.id === clientId) || { lock: false };
    return <Container>Hello World!</Container>;
  }
}
export default Thx;
