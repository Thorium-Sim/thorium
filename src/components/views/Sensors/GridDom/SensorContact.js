import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { Asset } from "../../../../helpers/assets";
import tinycolor from "tinycolor2";
import Explosion from "../../../../helpers/explosions";
import gql from "graphql-tag";

class Ping extends Component {
  constructor(props) {
    super(props);
    this.state = { opacity: 1, size: props.id ? 0 : props.size };
  }
  componentDidMount() {
    if (this.props.id) {
      setTimeout(() => {
        this.setState({ opacity: 0, size: this.props.size });
      }, 50);
    }
  }
  render() {
    const { opacity, size } = this.state;
    const { color, width, x, y, core } = this.props;
    return (
      <div className="sensors-ping-holder">
        <div
          className="sensor-ping-mover"
          style={{
            transform: `translate(${(width / 2) * x}px, ${(width / 2) * y}px)`
          }}
        >
          <Mutation
            mutation={gql`
              mutation RemoveContact($id: ID!, $contact: ID!) {
                removeSensorContact(id: $id, contact: { id: $contact })
              }
            `}
            variables={{ id: this.props.sensorsId, contact: this.props.id }}
          >
            {action => (
              <div
                className="sensors-ping"
                onTransitionEnd={core ? action : () => {}}
                style={{
                  opacity,
                  borderColor: tinycolor(color).toString(),
                  transform: `scale(${size})`,
                  boxShadow: `inset 0px 0px 20px ${tinycolor(color).toString()}`
                }}
              />
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}
export default class SensorContact extends Component {
  render() {
    const {
      id,
      location,
      destination = {},
      icon,
      width,
      size,
      core,
      opacity,
      type,
      color,
      destroyed,
      rotation = 0,
      targeted,
      selected,
      disabled,
      mouseover = () => {},
      mousedown = () => {},
      removeContact = () => {}
    } = this.props;
    if (!location) return null;
    const { x, y } = location;
    const { x: dx = 0, y: dy = 0 } = destination;
    if (type === "ping") {
      return <Ping {...this.props} {...location} />;
    }
    if (type === "border") {
      return (
        <div className="sensors-border-holder">
          <div
            className="sensors-border"
            onMouseOver={() => mouseover(this.props)}
            onMouseOut={selected ? null : () => mouseover({})}
            onMouseDown={e => mousedown(this.props, e)}
            style={{
              opacity: core ? 0.5 : opacity * 0.7,
              width: core ? "150%" : "500%",
              height: `${size}%`,
              borderColor: tinycolor(color)
                .darken(10)
                .toString(),
              backgroundColor: tinycolor(color).toString(),
              transform: `translate(${(width / 2) * x}px, ${(width / 2) *
                y}px) rotate(${rotation}deg)`
            }}
          />
          {core && (
            <div
              className="sensors-border"
              onMouseDown={mousedown}
              style={{
                width: core ? "150%" : "500%",
                height: `${size}%`,

                borderColor: tinycolor(color)
                  .darken(10)
                  .toString(),

                backgroundColor: tinycolor(color).toString(),
                transform: `translate(${(width / 2) * dx}px, ${(width / 2) *
                  dy}px) rotate(${rotation}deg)`
              }}
            />
          )}
        </div>
      );
    }
    if (type === "planet") {
      return (
        <div className="sensors-planet-holder">
          <div
            className="sensors-planet"
            onMouseOver={() => mouseover(this.props)}
            onMouseOut={selected ? null : () => mouseover({})}
            onMouseDown={e => mousedown(this.props, e)}
            style={{
              opacity: core ? 0.5 : opacity * 0.7,
              borderColor: tinycolor(color)
                .darken(10)
                .toString(),
              backgroundColor: tinycolor(color).toString(),
              transform: `translate(${(width / 2) * x}px, ${(width / 2) *
                y}px) scale(${size})`
            }}
          />
          {core && (
            <div
              className="sensors-planet"
              onMouseDown={mousedown}
              style={{
                borderColor: tinycolor(color)
                  .darken(10)
                  .toString(),
                backgroundColor: tinycolor(color).toString(),
                transform: `translate(${(width / 2) * dx}px, ${(width / 2) *
                  dy}px) scale(${size})`
              }}
            />
          )}
        </div>
      );
    }
    if (destroyed) {
      return (
        <Explosion
          style={{
            width: "10%",
            height: "10%",
            transform: `translate(${(width / 2) * x + 5}px, ${(width / 2) * y +
              5}px) scale(${size})`
          }}
          onComplete={() => removeContact(id)}
        />
      );
    }
    return (
      <div>
        <Fragment>
          <Asset asset={icon}>
            {({ src }) => (
              <img
                alt="contact"
                draggable="false"
                onMouseOver={() => mouseover(this.props)}
                onMouseOut={selected ? null : () => mouseover({})}
                onMouseDown={e => mousedown(this.props, e)}
                src={src}
                className={disabled ? "contact-disabled" : ""}
                style={{
                  opacity: core ? 0.5 : opacity,
                  transform: `translate(${(width / 2) * x}px, ${(width / 2) *
                    y}px) scale(${size})`
                }}
              />
            )}
          </Asset>
          {!core &&
            selected && (
              <div
                className="contact-selection"
                style={{
                  transform: `translate(${(width / 2) * dx}px, ${(width / 2) *
                    dy}px) scale(${size})`
                }}
              >
                <div className="tl" />
                <div className="tr" />
                <div className="bl" />
                <div className="br" />
              </div>
            )}
        </Fragment>
        {core && (
          <Fragment>
            <Asset asset={icon}>
              {({ src }) => (
                <img
                  alt="icon"
                  draggable="false"
                  onMouseDown={mousedown}
                  src={src}
                  className={disabled ? "contact-disabled" : ""}
                  style={{
                    backgroundColor: selected ? "blue" : "",
                    transform: `translate(${(width / 2) * dx}px, ${(width / 2) *
                      dy}px) scale(${size})`
                  }}
                />
              )}
            </Asset>
            {targeted && (
              <div
                className="crosshairs"
                style={{
                  transform: `translate(${(width / 2) * dx}px, ${(width / 2) *
                    dy}px) scale(${size})`
                }}
              >
                <div className="tl" />
                <div className="tr" />
                <div className="bl" />
                <div className="br" />
              </div>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}
