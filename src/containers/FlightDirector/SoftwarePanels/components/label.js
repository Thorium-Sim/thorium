import React, { Component } from "react";

class Label extends Component {
  render() {
    const {
      onMouseDown,
      page,
      edit,
      scaleComp,
      scale = 1,
      label = "label"
    } = this.props;
    return (
      <div style={{ transform: `scale(${scale})` }}>
        <div onMouseDown={onMouseDown}>
          <span className="label">{label}</span>
        </div>
        {page && edit && <div className="scale" onMouseDown={scaleComp} />}
      </div>
    );
  }
}

export default Label;
