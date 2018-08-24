import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import Measure from "react-measure";
import tinycolor from "tinycolor2";
import Explosion from "../../../../helpers/explosions";
import gql from "graphql-tag";
import { subscribe } from "../../helpers/pubsub";
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
    const { sensorsId, id, color, width, x, y, core } = this.props;
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
            variables={{ id: sensorsId, contact: id }}
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
const ContactSelection = ({ width, x, y, size, contactDims }) => {
  const offsetX = contactDims.width / 2;
  const offsetY = contactDims.height / 2;
  return (
    <div
      className="contact-selection"
      style={{
        position: "absolute",
        transform: `translate(${(width / 2) * x +
          contactDims.width / Math.E / size}px, ${(width / 2) * y +
          contactDims.height / Math.E / size}px)`
      }}
    >
      <div
        className="tl"
        style={{
          transform: `translate(${-offsetX}px, ${-offsetY}px) scale(${size})`
        }}
      />
      <div
        className="tr"
        style={{
          transform: `translate(${offsetX}px, ${-offsetY}px) scale(${size})`
        }}
      />
      <div
        className="bl"
        style={{
          transform: `translate(${-offsetX}px, ${offsetY}px) scale(${size})`
        }}
      />
      <div
        className="br"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${size})`
        }}
      />
    </div>
  );
};
export default class SensorContact extends Component {
  state = {};
  componentDidMount() {
    const { id: contactId } = this.props;
    this.subscription1 = subscribe(
      "battle-contact-hover",
      ({ id }) => id === contactId && this.setState({ hilite: true })
    );
    this.subscription2 = subscribe(
      "battle-contact-leave",
      ({ id }) => id === contactId && this.setState({ hilite: false })
    );
  }
  componentWillUnmount() {
    this.subscription1 && this.subscription1();
    this.subscription2 && this.subscription2();
  }
  bgColor(selected, hilite) {
    if (hilite) return "#0f0";
    if (selected) return "blue";
    return null;
  }
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
      hostile,
      destroyed,
      rotation = 0,
      targeted,
      selected,
      disabled,
      mouseover = () => {},
      mousedown = () => {},
      removeContact = () => {}
    } = this.props;
    const { hilite } = this.state;
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
              id={`contact-${id}`}
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
              id={`contact-${id}`}
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
    if (type === "projectile") {
      return (
        <div>
          <div
            style={{
              position: "absolute",
              backgroundColor: "white",
              borderRadius: "50%",
              width: "1%",
              height: "1%",
              transform: `translate(${(width / 2) * x}px, ${(width / 2) * y}px)`
            }}
          />
        </div>
      );
    }
    return (
      <div>
        <Fragment>
          <Measure
            bounds
            onResize={contentRect => {
              this.setState({ dimensions: contentRect.bounds });
            }}
          >
            {({ measureRef }) => (
              <img
                ref={measureRef}
                alt="contact"
                draggable="false"
                onMouseOver={() => mouseover(this.props)}
                onMouseOut={selected ? null : () => mouseover({})}
                onMouseDown={e => mousedown(this.props, e)}
                src={`/assets${icon}`}
                className={disabled ? "contact-disabled" : ""}
                style={{
                  opacity: core ? 0.5 : opacity,
                  transform: `translate(${(width / 2) * x}px, ${(width / 2) *
                    y}px) scale(${size})`
                }}
              />
            )}
          </Measure>
          {!core &&
            this.state.dimensions &&
            selected && (
              <ContactSelection
                contactDims={this.state.dimensions}
                width={width}
                x={x}
                y={y}
                size={size}
              />
            )}
        </Fragment>
        {core && (
          <Fragment>
            <img
              id={`contact-${id}`}
              alt="icon"
              draggable="false"
              onMouseDown={mousedown}
              src={`/assets${icon}`}
              className={disabled ? "contact-disabled" : ""}
              style={{
                boxShadow: hostile ? "2px 2px 2px rgba(255,0,0,0.5)" : null,
                backgroundColor: this.bgColor(selected, hilite),
                transform: `translate(${(width / 2) * dx}px, ${(width / 2) *
                  dy}px) scale(${size})`
              }}
            />
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
