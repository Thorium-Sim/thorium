import React, { Component } from "react";
import gql from "graphql-tag.macro";
import DamageOverlay from "../helpers/DamageOverlay";
import { Button } from "reactstrap";
import { titleCase } from "change-case";
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
    return (
      <div className="torpedo-loader fire">
        <DamageOverlay
          system={torpedo}
          message={`${torpedo.name} Offline`}
          style={{
            fontSize: "20px"
          }}
        />
        <h4 className="text-center">{torpedo.name}</h4>
        <p>
          Type:{" "}
          {titleCase(
            (torpedo.inventory.find(t => t.id === torpedo.loaded) || {}).type
          ) || "None"}
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
