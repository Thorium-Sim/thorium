import React, { Component } from "react";
import gql from "graphql-tag";
import DamageOverlay from "../helpers/DamageOverlay";
import { Button } from "reactstrap";

class TorpedoFire extends Component {
  state = { enabled: true };
  fireTorpedo = () => {
    const { torpedo } = this.props;
    const mutation = gql`
      mutation fireWarhead($id: ID!) {
        torpedoFire(id: $id)
      }
    `;
    const variables = {
      id: torpedo.id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      enabled: false
    });
    //Reenable the buttons
    setTimeout(() => {
      this.setState({
        enabled: true
      });
    }, 4000);
  };
  render() {
    const { enabled } = this.state;
    const { torpedo } = this.props;
    console.log(torpedo);
    return (
      <div className="torpedo-loader fire">
        <DamageOverlay
          system={torpedo}
          message={`${torpedo.name} Offline`}
          style={{
            height: "250px",
            width: "500px"
          }}
        />
        <h4 className="text-center">
          {torpedo.name}
        </h4>
        <p>
          Type:{" "}
          {(torpedo.inventory.find(t => t.id === torpedo.loaded) || {}).type ||
            "None"}
        </p>
        <Button
          block
          color="danger"
          disabled={
            !enabled ||
            !(torpedo.inventory.find(t => t.id === torpedo.loaded) || {}).type
          }
          onClick={this.fireTorpedo}
        >
          Fire {torpedo.name}
        </Button>
      </div>
    );
  }
}
export default TorpedoFire;
