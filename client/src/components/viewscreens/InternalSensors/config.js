import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Button, Input } from "helpers/reactstrap";

export default class InternalScanConfig extends Component {
  constructor(props) {
    super(props);
    const data = JSON.parse(this.props.data);
    this.state = {
      scanRequest: data.scanRequest,
      scanResults: data.scanResults
    };
  }
  beginScan = () => {
    let { data, updateData } = this.props;
    const { scanRequest } = this.state;
    data = JSON.parse(data);
    updateData(
      JSON.stringify(Object.assign({}, data, { scanning: true, scanRequest }))
    );
  };
  answerScan = () => {
    let { data, updateData } = this.props;
    const { scanResults } = this.state;
    data = JSON.parse(data);
    updateData(
      JSON.stringify(Object.assign({}, data, { scanning: false, scanResults }))
    );
  };
  render() {
    let { data, updateData } = this.props;
    data = JSON.parse(data);
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={data.reactive}
            onChange={evt =>
              updateData(
                JSON.stringify(
                  Object.assign({}, data, { reactive: evt.target.checked })
                )
              )
            }
          />{" "}
          Use simulator data
        </label>
        <InputGroup size="sm">
          <Input
            value={this.state.scanRequest}
            onChange={evt => this.setState({ scanRequest: evt.target.value })}
          />
          <InputGroupAddon addonType="append">
            <Button color="success" onClick={this.beginScan}>
              Begin Scan
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup size="sm">
          <Input
            value={this.state.scanResults}
            onChange={evt => this.setState({ scanResults: evt.target.value })}
          />
          <InputGroupAddon addonType="append">
            <Button color="info" onClick={this.answerScan}>
              Answer Scan
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}
