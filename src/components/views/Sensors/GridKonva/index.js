import React, { Component } from "react";
import ReactKonva from "react-konva";
import SensorContact from "./SensorContact";
import ArmyContact from "./ArmyContact";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Immutable from "immutable";
import { findDOMNode } from "react-dom";

function degtorad(deg) {
  return deg * (Math.PI / 180);
}

// Implement The following:
// weaponsRange

const { Layer, Line, Stage, Circle, Group, Text } = ReactKonva;

const SENSORCONTACT_SUB = gql`
  subscription SensorContactsChanged($sensorId: ID) {
    sensorContactUpdate(sensorId: $sensorId) {
      id
      name
      size
      color
      icon
      picture
      speed
      velocity {
        x
        y
        z
      }
      location {
        x
        y
        z
      }
      destination {
        x
        y
        z
      }
      infrared
      cloaked
      destroyed
    }
  }
`;

class GridCoreGrid extends Component {
  sensorContactsSubscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sensorsSubscription && !nextProps.data.loading) {
      this.sensorsSubscription = nextProps.data.subscribeToMore({
        document: SENSORCONTACT_SUB,
        variables: { sensorId: this.props.sensor },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .mergeDeep({
              sensorContacts: subscriptionData.data.sensorContactUpdate
            })
            .toJS();
        }
      });
    }
  }
  componentWillUnmount() {
    this.sensorsSubscription && this.sensorsSubscription();
  }
  componentDidMount() {
    setTimeout(() => {
      findDOMNode(this).querySelectorAll("canvas").forEach(c => {
        c.addEventListener("contextmenu", e => {
          e.preventDefault();
        });
      });
    }, 200);
  }
  render() {
    if (this.props.data.loading) return null;
    const {
      dimensions,
      data,
      core,
      moveSpeed,
      setSelectedContact,
      selectedContact,
      armyContacts
    } = this.props;
    const { sensorContacts: contacts } = data;
    const { width: dimWidth, height: dimHeight } = dimensions;
    const width = Math.min(dimWidth, dimHeight);
    const padding = core ? 15 : 0;
    const radius = width / 2 - padding;
    return (
      <div id="sensorGrid">
        <Stage width={dimWidth} height={width}>
          <Layer>
            {core &&
              <Circle
                radius={radius * 1.08}
                x={radius + padding}
                y={radius + padding}
                stroke={"gray"}
                fill={"gray"}
                strokeWidth={1}
              />}
            <Circle
              radius={radius}
              x={radius + padding}
              y={radius + padding}
              fillRadialGradientStartPoint={{
                x: 0,
                y: 0
              }}
              fillRadialGradientStartRadius={radius / 2}
              fillRadialGradientEndPoint={{
                x: 0,
                y: 0
              }}
              fillRadialGradientEndRadius={radius}
              fillRadialGradientColorStops={[0, "rgba(0,0,0,0.6)", 1, "#000"]}
              fill={core ? "black" : null}
              stroke={"gray"}
              strokeWidth={2}
            />
            <Circle
              radius={radius * 0.66}
              x={radius + padding}
              y={radius + padding}
              stroke={"gray"}
              strokeWidth={1}
            />
            <Circle
              radius={radius * 0.33}
              x={radius + padding}
              y={radius + padding}
              stroke={"gray"}
              strokeWidth={1}
            />
            {Array(12).fill(1).map((a, i) => {
              return (
                <Line
                  key={`line-${i}`}
                  stroke={"gray"}
                  strokeWidth={1}
                  points={[
                    radius + padding,
                    radius + padding,
                    Math.cos(degtorad(i * 30 + 15)) * radius + radius + padding,
                    Math.sin(degtorad(i * 30 + 15)) * radius + radius + padding
                  ]}
                />
              );
            })}
          </Layer>
          <Layer>
            {contacts.map(contact =>
              <SensorContact
                key={contact.id}
                core={core}
                sensor={this.props.sensor}
                {...contact}
                moveSpeed={moveSpeed}
                dimensions={dimensions}
                radius={radius}
                padding={padding}
                mouseover={this.props.hoverContact}
                setSelectedContact={setSelectedContact}
                selectedContact={selectedContact}
              />
            )}
          </Layer>
          {core &&
            <Layer>
              <Text text="Contacts" x={width + 50} y={0} />
              {armyContacts.map((a, i, array) =>
                <Group
                  key={a.id}
                  x={width + 50}
                  y={(i + 1) * (array[i - 1] ? array[i - 1].size * 40 : 40)}
                >
                  <ArmyContact
                    {...a}
                    x={width + 50}
                    y={(i + 1) * (array[i - 1] ? array[i - 1].size * 40 : 40)}
                    radius={radius}
                    padding={padding}
                    sensor={this.props.sensor}
                    setSelectedContact={setSelectedContact}
                    selectedContact={selectedContact}
                  />

                  <Text text={a.name} x={a.size * 25} />
                </Group>
              )}
            </Layer>}
        </Stage>
      </div>
    );
  }
}

const CONTACTS_QUERY = gql`
  query Contacts($sensorsId: ID) {
    sensorContacts(sensorsId: $sensorsId) {
      id
      name
      size
      icon
      picture
      color
      speed
      velocity {
        x
        y
        z
      }
      location {
        x
        y
        z
      }
      destination {
        x
        y
        z
      }
      infrared
      cloaked
      destroyed
    }
  }
`;

export default graphql(CONTACTS_QUERY, {
  options: ({ sensor }) => ({ variables: { sensorsId: sensor } })
})(withApollo(GridCoreGrid));
