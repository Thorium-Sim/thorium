import React, { Component } from "react";
import { Asset } from "../../../../helpers/assets";
import IconMarkup from "./IconMarkup";

export default class TacticalIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: props.destination
    };
    this.dragging = false;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.dragging) {
      this.setState({
        destination: nextProps.destination
      });
    }
  }
  mouseDown = evt => {
    if (!this.props.isSelected) {
      this.dragging = true;
    }
    evt.stopPropagation();
    evt.preventDefault();
    this.props.selectObject(this.props);
    this.setState({
      targetBounds: evt.target.getBoundingClientRect()
    });
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("mousemove", this.mouseMove);
  };
  mouseUp = () => {
    if (this.props.isSelected) {
      this.props.moveMultiple("cancel");
    } else {
      const { x, y, z } = this.state.destination;
      if (x > 1 || x < 0 || y > 1 || y < 0) {
        this.props.removeObject();
      } else {
        this.props.updateObject("destination", { x, y, z });
      }
      this.dragging = false;
      this.setState({
        targetBounds: null
      });
    }
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mousemove", this.mouseMove);
  };
  mouseMove = evt => {
    const bounds = document
      .querySelector(".tactical-map-view")
      .getBoundingClientRect();
    if (this.props.isSelected) {
      this.props.moveMultiple(evt, bounds);
    } else {
      const { destination } = this.state;
      const x = destination.x + evt.movementX / bounds.width;
      const y = destination.y + evt.movementY / bounds.height;
      this.setState({
        destination: Object.assign({}, this.state.destination, { x, y })
      });
    }
  };
  render() {
    const { destination } = this.state;
    const {
      icon,
      id,
      location,
      objectId,
      size,
      label,
      font,
      fontColor,
      fontSize,
      flash,
      flashing,
      core,
      rotation,
      movement = { x: 0, y: 0, z: 0 },
      isSelected
    } = this.props;
    if (icon) {
      return (
        <Asset asset={icon}>
          {({ src }) => (
            <IconMarkup
              mouseDown={this.mouseDown}
              destination={destination}
              location={location}
              movement={movement}
              size={size}
              objectId={objectId}
              isSelected={isSelected}
              rotation={rotation}
              id={id}
              src={src}
              font={font}
              flash={flash}
              flashing={flashing}
              fontColor={fontColor}
              fontSize={fontSize}
              label={label}
              core={core}
            />
          )}
        </Asset>
      );
    }
    return (
      <IconMarkup
        mouseDown={this.mouseDown}
        location={location}
        movement={movement}
        destination={destination}
        size={size}
        objectId={objectId}
        isSelected={isSelected}
        rotation={rotation}
        id={id}
        font={font}
        flash={flash}
        flashing={flashing}
        fontColor={fontColor}
        fontSize={fontSize}
        label={label}
        core={core}
      />
    );
  }
}
