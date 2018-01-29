import React, { Component } from "react";
import SensorContact from "./SensorContact";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Segments from "./blackout";

import "./style.css";

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

// Implement The following:
// weaponsRange

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
      type
      rotation
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
      position {
        x
        y
        z
      }
      movementTime
      startTime
      endTime
      infrared
      cloaked
      destroyed
      forceUpdate
    }
  }
`;

class GridDom extends Component {
  state = {
    locations: {},
    movingContact: null,
    iconWidth: null,
    iconHeight: null
  };
  interval = 1000 / 30;
  sensorContactsSubscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sensorsSubscription && !nextProps.data.loading) {
      this.sensorsSubscription = nextProps.data.subscribeToMore({
        document: SENSORCONTACT_SUB,
        variables: { sensorId: this.props.sensor },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            sensorContacts: subscriptionData.data.sensorContactUpdate
          });
        }
      });
    }
    if (!nextProps.data.loading) {
      this.setState(({ locations }) => {
        nextProps.data.sensorContacts &&
          nextProps.data.sensorContacts.forEach(c => {
            let location = c.position;
            if (c.forceUpdate) location = c.position;
            if (this.props.ping === nextProps.ping) {
              locations[c.id] = {
                location,
                speed: c.speed,
                opacity: nextProps.pings
                  ? this.contactPing(c, Date.now() - nextProps.pingTime)
                  : 1,
                destination:
                  this.state.movingContact === c.id
                    ? locations[c.id].destination
                    : c.destination
              };
            }
          });
        return { locations };
      });
    }
  }
  componentDidMount() {
    this.contactTimeout = setTimeout(this.contactLoop, this.interval);
  }
  componentWillUnmount() {
    clearTimeout(this.contactTimeout);
    this.contactTimeout = null;
    this.sensorsSubscription && this.sensorsSubscription();
  }
  contactLoop = () => {
    if (this.contactTimeout) {
      this.contactTimeout = setTimeout(this.contactLoop, this.interval);
    } else return;
    if (!this.props.data.loading) {
      const {
        data: { sensorContacts: contacts },
        pingTime,
        pings
      } = this.props;
      const locations = {};
      contacts.forEach(c => {
        const location = this.state.locations[c.id];
        let { speed, destination } = Object.assign({}, c);
        if (location) {
          speed = location.speed;
          destination = location.destination;
        }
        const moveResult = this.moveContact(c, location.location, speed);
        moveResult.destination = destination;
        if (pings) {
          moveResult.opacity = this.contactPing(c, Date.now() - pingTime);
        } else {
          moveResult.opacity = 1;
        }
        locations[c.id] = moveResult;
      });
      this.setState({ locations });
    }
  };
  moveContact = (
    { destination, location, startTime, endTime },
    position,
    speed
  ) => {
    if (speed === 0) {
      return {
        location: position,
        speed
      };
    }
    const time = Date.now();
    if (speed > 100) {
      return {
        location: destination,
        speed: 0
      };
    } else if (speed > 0) {
      // Total movement time is the difference between the distance and location
      // Divided by the speed times one second (1000 ms)
      const currentTime = time - startTime;
      // Location is a function of the current time and the end time.
      const newLoc = {
        x:
          location.x +
          (destination.x - location.x) / (endTime - startTime) * currentTime,
        y:
          location.y +
          (destination.y - location.y) / (endTime - startTime) * currentTime,
        z: 0
      };
      if (distance3d(destination, position) < 0.005) {
        return {
          speed: 0,
          location: destination
        };
      }
      return {
        speed,
        location: newLoc
      };
    }
  };
  contactPing = ({ location }, delta) => {
    //If the ping happened too long ago, just return 0
    if (delta > 7000) {
      return 0;
    }
    // Fade out the icon
    if (delta > 4000) {
      return Math.abs(1 - (delta - 4000) / (7000 - 4000));
    }
    // Get the distance
    const distance = distance3d(location, { x: 0, y: 0, z: 0 });
    const multiplier = 1500;
    if (delta > distance * multiplier) {
      return 1;
    }
    return 0;
  };
  _moveMouse = e => {
    const { dimensions, core } = this.props;
    const { movingContact, locations, iconWidth, iconHeight } = this.state;
    if (!movingContact) return;
    const { width: dimWidth, height: dimHeight } = dimensions;
    const padding = core ? 15 : 0;
    const width = Math.min(dimWidth, dimHeight) - padding;
    const destination = {
      x:
        (e.clientX - dimensions.left - padding - iconWidth / 2 - width / 2) /
        (width / 2),
      y:
        (e.clientY - dimensions.top - padding - iconHeight / 2 - width / 2) /
        (width / 2),
      z: 0
    };

    const obj = {};
    obj[movingContact] = locations[movingContact];
    obj[movingContact].destination = destination;

    this.setState({
      locations: Object.assign(locations, obj)
    });
  };
  _downMouse(e, id) {
    const self = this;
    if (!e.target) return;
    const width = e.target.getBoundingClientRect().width;
    const height = e.target.getBoundingClientRect().height;
    const { sensorContacts: contacts } = this.props.data;
    const contact = contacts.find(c => c.id === id);
    document.addEventListener("mousemove", this._moveMouse);
    document.addEventListener("mouseup", _upMouse);
    this.setState({
      movingContact: id,
      iconWidth:
        contact.type === "planet" || contact.type === "border" ? 0 : width,
      iconHeight:
        contact.type === "planet" || contact.type === "border" ? 0 : height
    });
    function _upMouse(evt) {
      document.removeEventListener("mousemove", self._moveMouse);
      document.removeEventListener("mouseup", _upMouse);
      if (self.props.askForSpeed) {
        self.setState({
          speedAsking: {
            x: evt.clientX,
            y: evt.clientY
          }
        });
      } else {
        self.triggerUpdate(self.props.moveSpeed);
      }
    }
  }
  triggerUpdate = speed => {
    // Send the update to the server
    const { sensorContacts: contacts } = this.props.data;
    const { movingContact, locations } = this.state;
    if (!locations[movingContact]) return;
    const { destination } = locations[movingContact];
    this.setState({
      movingContact: false,
      iconWidth: null,
      iconHeight: null,
      speedAsking: null
    });
    const distance = distance3d({ x: 0, y: 0, z: 0 }, destination);
    let mutation;
    const contact = contacts.find(c => c.id === movingContact);
    const maxDistance = contact.type === "planet" ? 2 : 1.1;
    if (distance > maxDistance) {
      // Delete the contact
      mutation = gql`
        mutation DeleteContact($id: ID!, $contact: SensorContactInput!) {
          removeSensorContact(id: $id, contact: $contact)
        }
      `;
    } else {
      mutation = gql`
        mutation MoveSensorContact($id: ID!, $contact: SensorContactInput!) {
          moveSensorContact(id: $id, contact: $contact)
        }
      `;
    }
    const variables = {
      id: this.props.sensor,
      contact: {
        id: movingContact,
        speed: speed,
        destination: {
          x: destination.x,
          y: destination.y,
          z: destination.z
        }
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  cancelMove = () => {
    const { movingContact: id, locations } = this.state;
    const obj = {};
    obj[id] = locations[id];
    obj[id].destination = obj[id].location;
    this.setState({
      locations: Object.assign(locations, obj),
      movingContact: null,
      speedAsking: null
    });
  };
  _clickMouse = contact => {
    const { x, y, z } = contact.location;
    const mutation = gql`
      mutation SetCalculatedTarget(
        $simulatorId: ID
        $coordinates: CoordinatesInput!
        $contactId: ID
      ) {
        setTargetingCalculatedTarget(
          simulatorId: $simulatorId
          coordinates: $coordinates
          contactId: $contactId
        )
      }
    `;
    const variables = {
      simulatorId: this.props.simulatorId,
      coordinates: { x: Math.abs(x), y: Math.abs(y), z: Math.abs(z) },
      contactId: contact.id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.sensorContacts) return null;
    const {
      dimensions,
      data,
      core,
      movingContact,
      speeds,
      ping,
      rings = 3,
      lines = 12,
      hoverContact,
      segments,
      sensor
    } = this.props;
    const { locations, speedAsking } = this.state;
    const { sensorContacts: contacts } = data;
    if (!dimensions) return <div id="sensorGrid" />;

    const { width: dimWidth, height: dimHeight } = dimensions;
    const padding = core ? 15 : 0;
    const width = Math.min(dimWidth, dimHeight) - padding;
    const gridStyle = {
      width: `${width}px`,
      height: `${width}px`,
      borderWidth: core ? `${padding}px` : "4px"
    };
    return (
      <div id="sensorGrid" style={gridStyle}>
        <div className={`grid ${ping ? "ping" : ""}`}>
          <Segments segments={segments} sensors={sensor} />
          {Array(rings)
            .fill(0)
            .map((_, i, array) => (
              <div
                key={`ring-${i}`}
                className="ring"
                style={{
                  width: `${(i + 1) / array.length * 100}%`,
                  height: `${(i + 1) / array.length * 100}%`
                }}
              />
            ))}
          {Array(lines)
            .fill(0)
            .map((_, i, array) => (
              <div
                key={`line-${i}`}
                className="line"
                style={{
                  transform: `rotate(${(i + 0.5) / array.length * 360}deg)`
                }}
              />
            ))}
          <div className="ping-ring" />
          {contacts &&
            contacts.map(
              contact =>
                locations[contact.id] && (
                  <SensorContact
                    key={contact.id}
                    width={width}
                    core={core}
                    {...contact}
                    mousedown={
                      core
                        ? e => this._downMouse(e, contact.id)
                        : this._clickMouse
                    }
                    location={locations[contact.id].location}
                    destination={locations[contact.id].destination}
                    opacity={
                      this.props.pings ? locations[contact.id].opacity : 1
                    }
                    mouseover={e => {
                      if (
                        hoverContact &&
                        locations[contact.id].opacity > 0.25
                      ) {
                        hoverContact(e);
                      }
                    }}
                  />
                )
            )}
          {movingContact && (
            <SensorContact
              width={width}
              core={core}
              destination={movingContact.location}
              {...movingContact}
            />
          )}
          {speedAsking && (
            <div
              className="speed-container"
              style={{
                transform: `translate(${speedAsking.x}px, ${speedAsking.y}px)`
              }}
            >
              {speeds.map(s => (
                <p key={s.value} onClick={() => this.triggerUpdate(s.value)}>
                  {s.label}
                </p>
              ))}
              <p onClick={this.cancelMove}>Stop</p>
            </div>
          )}
        </div>
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
      type
      rotation
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
      position {
        x
        y
        z
      }
      movementTime
      startTime
      endTime
      infrared
      cloaked
      destroyed
      forceUpdate
    }
  }
`;

export default graphql(CONTACTS_QUERY, {
  options: ({ sensor }) => ({
    fetchPolicy: "cache-and-network",
    variables: { sensorsId: sensor }
  })
})(withApollo(GridDom));
