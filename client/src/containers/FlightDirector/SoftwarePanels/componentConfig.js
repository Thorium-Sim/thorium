import React, { Component } from "react";
import { Row, Col, FormGroup, Input, Label } from "reactstrap";
import { ChromePicker } from "react-color";

class Config extends Component {
  constructor(props) {
    super(props);
    const component = props.components.find(
      s => s.id === props.selectedComponent
    );
    this.state = {
      label: component.label,
      color: component.color
    };
  }
  componentDidUpdate(oldProps) {
    const component = this.props.components.find(
      s => s.id === this.props.selectedComponent
    );
    const oldComponent = oldProps.components.find(
      s => s.id === this.props.selectedComponent
    );

    if (!component || !oldComponent) return;
    if (
      oldComponent.label !== component.label ||
      oldComponent.color !== component.color
    ) {
      this.setState({
        label: component.label,
        color: component.color
      });
    }
  }
  render() {
    const {
      selectedComponent,
      components,
      connections,
      cables,
      applyUpdate
    } = this.props;
    const update = (value, which) => {
      applyUpdate({
        connections,
        cables,
        components: components.map(c => {
          if (c.id === selectedComponent) {
            return Object.assign({}, c, { [which]: value });
          }
          return c;
        })
      });
    };
    const component = components.find(c => c.id === selectedComponent);
    return (
      <Row className="component-config">
        <Col sm={4}>
          <FormGroup>
            <Label>Label</Label>
            <Input
              value={this.state.label}
              onChange={e => this.setState({ label: e.target.value })}
              onBlur={() => update(this.state.label, "label")}
            />
          </FormGroup>
        </Col>
        <Col sm={4}>
          {component.component &&
            ["Light", "PlasmaChannel"].indexOf(component.component) > -1 && (
              <FormGroup>
                <Label>Color</Label>
                <ChromePicker
                  color={this.state.color}
                  onChangeComplete={color =>
                    update(
                      `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${
                        color.rgb.a
                      })`,
                      "color"
                    )
                  }
                />
              </FormGroup>
            )}
        </Col>
      </Row>
    );
  }
}

export default Config;
