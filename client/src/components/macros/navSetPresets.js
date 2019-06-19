import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  Button
} from "helpers/reactstrap";

export default class NavSetPresetConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presets: props.args ? props.args.presets : []
    };
  }
  componentDidUpdate(oldProps) {
    if (JSON.stringify(oldProps.args) !== JSON.stringify(this.props.args)) {
      this.setState({
        presets: this.props.args.presets
      });
    }
  }
  update = (evt, which) => {
    const { presets = [], selectedPreset } = this.state;
    this.setState({
      presets: presets.map(p => {
        if (p.name === selectedPreset) {
          return Object.assign({}, p, {
            course: Object.assign({}, p.course, { [which]: evt.target.value })
          });
        }
        return p;
      })
    });
  };
  addPreset = () => {
    const { presets = [] } = this.state;
    const name = prompt("What is the name of the preset?");
    if (name && !presets.find(p => p.name === name)) {
      this.setState({
        presets: presets.concat({ name, course: { x: "", y: "", z: "" } })
      });
    }
  };
  updateArgs = () => {
    const { presets = [] } = this.state;
    this.props.updateArgs("presets", presets);
  };
  setSelected = preset => {
    this.setState({ selectedPreset: preset });
  };
  render() {
    const { presets = [], selectedPreset } = this.state;
    const preset = presets.find(p => p.name === selectedPreset);
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
