import React, { Component } from "react";
import { Button } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { randomFromList } from "../../../helpers/randomFromList";

class VirusScanner extends Component {
  state = {};
  timeouts = [];
  scan = () => {
    this.timeouts = [];
    const { files, terminals, virii } = this.props;
    this.setState({ scanning: true });
    const scanItems = files.concat(terminals);
    scanItems.forEach((t, i) => {
      this.timeouts.push(
        setTimeout(() => this.setState({ currentScan: t.name }), i * 50)
      );
    });
    this.timeouts.push(
      setTimeout(() => {
        const virus = randomFromList(virii);
        this.setState({ scanning: null, virus });
      }, (scanItems.length + 1) * 50)
    );
  };
  cancel = () => {
    this.timeouts.forEach(t => clearTimeout(t));
    this.timeouts = [];
    this.setState({ scanning: false });
  };
  removeVirus = action => {
    action();
    this.setState({
      scanning: false,
      currentScan: false,
      virus: false
    });
  };
  render() {
    const { id } = this.props;
    const { scanning, currentScan, virus } = this.state;
    if (virus) {
      return (
        <div>
          <p>Virus Found: {virus.name}</p>
          <Mutation
            mutation={gql`
              mutation RemoveVirus($id: ID!, $virusId: ID!) {
                deleteComputerCoreVirus(id: $id, virusId: $virusId)
              }
            `}
            variables={{ id, virusId: virus.id }}
          >
            {action => (
              <Button
                block
                color="danger"
                onClick={() => this.removeVirus(action)}
              >
                Remove Virus
              </Button>
            )}
          </Mutation>
        </div>
      );
    }
    if (scanning) {
      return (
        <div>
          <p>Scanning for viruses...</p>
          <p>{currentScan}</p>
          <Button block color="warning" onClick={this.cancel}>
            Cancel
          </Button>
        </div>
      );
    }
    return (
      <Button
        block
        color="warning"
        className="virus-scanner"
        onClick={this.scan}
      >
        Scan for Viruses
      </Button>
    );
  }
}

export default VirusScanner;
