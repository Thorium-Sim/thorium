import React, {Component} from "react";
import IconMarkup from "./IconMarkup";
import {clampItemPosition} from "./clampToBounds";

export default class TacticalIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: props.destination,
    };
    this.dragging = false;
  }
  componentDidUpdate() {
    if (!this.dragging) {
      if (
        this.state.destination.x !== this.props.destination.x ||
        this.state.destination.y !== this.props.destination.y ||
        this.state.destination.z !== this.props.destination.z
      )
        this.setState({
          destination: this.props.destination,
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
      targetBounds: evt.target.getBoundingClientRect(),
    });
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("mousemove", this.mouseMove);
  };
  mouseUp = () => {
    if (this.props.isSelected) {
      this.props.moveMultiple("cancel");
    } else {
      let {x, y, z} = this.state.destination;
      if (this.props.keepOnScreen) {
        ({x, y, z} = clampItemPosition(this.props, {x, y, z}));
      }
      this.props.updateObject("destination", {x, y, z});

      this.dragging = false;
      this.setState({
        targetBounds: null,
      });
    }
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mousemove", this.mouseMove);
  };
  mouseMove = evt => {
    const doc = document.querySelector(".tactical-map-view");
    if (!doc) return;
    const bounds = doc.getBoundingClientRect();
    if (this.props.isSelected) {
      this.props.moveMultiple(evt, bounds);
    } else {
      const {destination} = this.state;
      let x = destination.x + evt.movementX / bounds.width;
      let y = destination.y + evt.movementY / bounds.height;
      if (this.props.keepOnScreen) {
        ({x, y} = clampItemPosition(this.props, {x, y, z: destination.z}));
      }
      this.setState({
        destination: Object.assign({}, this.state.destination, {x, y}),
      });
    }
  };
  // Measure the icon's intrinsic dimensions once and persist them so the server
  // (and every client) can compute the keepOnScreen footprint. Stored only when
  // missing or changed, so this fires at most once per icon.
  handleIconLoad = ({naturalWidth, naturalHeight}) => {
    if (!naturalWidth || !naturalHeight) return;
    const {id, layerId, iconWidth, iconHeight} = this.props;
    if (iconWidth !== naturalWidth) {
      this.props.updateObject("iconWidth", naturalWidth, {id, layerId});
    }
    if (iconHeight !== naturalHeight) {
      this.props.updateObject("iconHeight", naturalHeight, {id, layerId});
    }
  };
  render() {
    const {destination} = this.state;
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
      opacity,
      interval,
      movement = {x: 0, y: 0, z: 0},
      isSelected,
      keepOnScreen,
      iconWidth,
      iconHeight,
    } = this.props;
    if (icon) {
      return (
        <IconMarkup
          mouseDown={this.mouseDown}
          destination={destination}
          location={location}
          movement={movement}
          interval={interval}
          size={size}
          objectId={objectId}
          isSelected={isSelected}
          rotation={rotation}
          opacity={opacity}
          id={id}
          src={`/assets${icon}`}
          font={font}
          flash={flash}
          flashing={flashing}
          fontColor={fontColor}
          fontSize={fontSize}
          label={label}
          core={core}
          keepOnScreen={keepOnScreen}
          iconWidth={iconWidth}
          iconHeight={iconHeight}
          onIconLoad={this.handleIconLoad}
        />
      );
    }
    return (
      <IconMarkup
        mouseDown={this.mouseDown}
        location={location}
        movement={movement}
        destination={destination}
        interval={interval}
        size={size}
        objectId={objectId}
        isSelected={isSelected}
        rotation={rotation}
        opacity={opacity}
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
