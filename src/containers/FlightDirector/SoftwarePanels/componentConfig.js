import React, { Component } from "react";
import { FormGroup, Input, Label } from "reactstrap";

class Config extends Component {
  constructor(props) {
    super(props);
    const component = props.components.find(
      s => s.id === props.selectedComponent
    );
    this.state = {
      label: component.label
    };
  }
  componentWillReceiveProps(nextProps) {
    const component = nextProps.components.find(
      s => s.id === nextProps.selectedComponent
    );
    this.setState({
      label: component.label
    });
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
    return (
      <div className="component-config">
        <FormGroup>
          <Label>Label</Label>
          <Input
            value={this.state.label}
            onChange={e => this.setState({ label: e.target.value })}
            onBlur={() => update(this.state.label, "label")}
          />
        </FormGroup>
      </div>
    );
  }
}

export default Config;
