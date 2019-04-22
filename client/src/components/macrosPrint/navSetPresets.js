import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";

export default class NavSetPresetConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presets: props.args && props.args.presets
    };
  }
  setSelected = preset => {
    this.setState({ selectedPreset: preset });
  };
  render() {
    const { presets = [], selectedPreset } = this.state;
    if (!presets) return null;
    const preset = presets && presets.find(p => p.name === selectedPreset);
    return (
      <Container>
        <Row>
          <Col sm={6} style={{ minHeight: "300px", overflowY: "scroll" }}>
            <ul>
              {presets.map(p => (
                <li
                  key={p.name}
                  className={`${selectedPreset === p.name ? "selected" : ""}`}
                  onClick={() => this.setSelected(p.name)}
                >
                  {p.name}
                </li>
              ))}
            </ul>
            <Button block color="success" size="sm" onClick={this.addPreset}>
              Add Preset
            </Button>
          </Col>
          <Col sm={6}>
            {preset && (
              <div>
                <PresetForm {...preset.course} update={this.update} />
              </div>
            )}
          </Col>
          <Button block color="success" size="sm" onClick={this.updateArgs}>
            Save
          </Button>
        </Row>
      </Container>
    );
  }
}

const PresetForm = ({ x, y, z, update }) => {
  return (
    <div>
      <FormGroup row>
        <Label for="x" sm={2}>
          X
        </Label>
        <Col sm={10}>
          <Input
            type="text"
            name="x"
            id="x"
            placeholder="999.99"
            value={x}
            onChange={evt => update(evt, "x")}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="y" sm={2}>
          Y
        </Label>
        <Col sm={10}>
          <Input
            type="text"
            name="y"
            id="y"
            placeholder="999.99"
            value={y}
            onChange={evt => update(evt, "y")}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="z" sm={2}>
          Z
        </Label>
        <Col sm={10}>
          <Input
            type="text"
            name="z"
            id="z"
            placeholder="999.99"
            value={z}
            onChange={evt => update(evt, "z")}
          />
        </Col>
      </FormGroup>
    </div>
  );
};
