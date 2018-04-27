import React, { Component } from "react";
import SensorContact from "./SensorContact";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Segments from "./blackout";
import Interference from "./interference";
import Selection from "./select";

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
      targeted
      locked
      disabled
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
      if (nextProps.updateSelected !== this.props.updateSelected) {
        // Re-update the selected contacts
        if (
          nextProps.data.sensorContacts &&
          nextProps.selectedContacts.length > 0
        ) {
          const selectedIds = nextProps.selectedContacts.map(c => c.id);
          nextProps.updateSelectedContacts(
            nextProps.data.sensorContacts.filter(
              c => selectedIds.indexOf(c) > -1
            )
          );
        }
      }
      // Set the locations
      this.setState(({ locations }) => {
        nextProps.data.sensorContacts &&
          nextProps.data.sensorContacts.forEach(c => {
            let location = c.position;
            //if (c.forceUpdate) location = c.location;
            if (this.props.ping === nextProps.ping) {
              locations[c.id] = {
                location,
                speed: c.speed,
                /*opacity: nextProps.pings
                  ? this.contactPing(c, Date.now() - nextProps.pingTime)
                  : 1,*/
                destination:
                  this.state.movingContact === c.id ||
                  (this.state.movingContact &&
                    this.props.selectedContacts.indexOf(c.id) > -1)
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
        movement
      } = this.props;
      this.props.client.writeQuery({
        query: CONTACTS_QUERY,
        data: {
          sensorContacts: contacts.map(c => {
            // Update movement
            const x = c.locked ? 0 : movement.x / 100;
            const y = c.locked ? 0 : movement.y / 100;
            const z = c.locked ? 0 : movement.z / 100;

            const destination = {
              ...c.destination,
              x: c.destination.x + x,
              y: c.destination.y + y,
              z: c.destination.z + z
            };
            const location = {
              ...c.location,
              x: c.location.x + x,
              y: c.location.y + y,
              z: c.location.z + z
            };
            const position = {
              ...c.position,
              x: c.position.x + x,
              y: c.position.y + y,
              z: c.position.z + z
            };
            if (c.speed === 0) {
              return { ...c, destination, position, location };
            }
            const time = Date.now();
            if (c.speed > 100) {
              return {
                ...c,
                destination,
                location: destination,
                position: destination
              };
            }
            // Total movement time is the difference between the distance and location
            // Divided by the speed times one second (1000 ms)
            const currentTime = time - c.startTime;
            // Location is a function of the current time and the end time.
            const endTime = c.endTime || c.startTime + 1000;
            const newLoc = {
              ...location,
              x:
                location.x +
                (destination.x - location.x) /
                  (endTime - c.startTime) *
                  currentTime,
              y:
                location.y +
                (destination.y - location.y) /
                  (endTime - c.startTime) *
                  currentTime,
              z: 0
            };
            if (endTime < Date.now()) {
              return {
                ...c,
                destination,
                position: destination,
                location: destination
              };
            }
            return { ...c, destination, position: newLoc, location };
          })
        }
      });
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
    const { dimensions, core, selectedContacts } = this.props;
    const { movingContact, locations } = this.state;
    if (!movingContact && selectedContacts.length === 0) return;
    const { width: dimWidth, height: dimHeight } = dimensions;
    const padding = core ? 15 : 0;
    const width = Math.min(dimWidth, dimHeight) - padding;
    const destinationDiff = {
      x: e.movementX / width * 2,
      y: e.movementY / width * 2,
      z: 0
    };
    const obj = {};
    if (selectedContacts.length === 0) {
      const destination = locations[movingContact].destination;
      obj[movingContact] = locations[movingContact];
      obj[movingContact].destination = {
        x: destination.x + destinationDiff.x,
        y: destination.y + destinationDiff.y,
        z: 0
      };
    } else {
      selectedContacts.forEach(c => {
        const destination = locations[c].destination;
        obj[c] = locations[c];
        obj[c].destination = {
          x: destination.x + destinationDiff.x,
          y: destination.y + destinationDiff.y,
          z: 0
        };
      });
    }
    this.setState({
      locations: Object.assign(locations, obj)
    });
  };
  _downMouse(e, id) {
    const self = this;
    this.downMouseTime = Date.now();
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
      const { updateSelectedContacts } = self.props;
      document.removeEventListener("mousemove", self._moveMouse);
      document.removeEventListener("mouseup", _upMouse);
      const t = Date.now() - self.downMouseTime;
      if (self.downMouseTime && t < 200) {
        updateSelectedContacts(contacts.filter(c => c.id === id));
      }
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
    const { selectedContacts } = this.props;
    const { sensorContacts: contacts } = this.props.data;
    const { movingContact, locations } = this.state;
    if (selectedContacts.length > 0) {
      const contactUpdateData = selectedContacts.map(c => {
        const { __typename, ...destination } = locations[c].destination;
        return {
          id: c,
          speed,
          destination
        };
      });
      const mutation = gql`
        mutation MoveSensorContact($id: ID!, $contacts: [SensorContactInput]!) {
          updateSensorContacts(id: $id, contacts: $contacts)
        }
      `;
      const variables = {
        id: this.props.sensor,
        contacts: contactUpdateData
      };
      this.props.client.mutate({
        mutation,
        variables
      });
    } else {
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
      const maxDistance =
        contact.type === "planet" ? 1 + contact.size / 2 : 1.1;
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
    }
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
      damaged,
      sensor,
      interference = 0,
      selectedContacts,
      updateSelectedContacts
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
          {damaged && <div class="damaged-sensors" />}
          {interference > 0 && (
            <Interference width={width} interference={interference} />
          )}
          {selectedContacts && (
            <Selection
              containerSelector=".grid"
              onSelectionChange={(a, b) => {
                if (!b) {
                  this.setState({ selectedContacts: [] });
                  return;
                }
                const bounds = {
                  x1: (b.left - width / 2) / width * 2,
                  x2: (b.width + b.left - width / 2) / width * 2,
                  y1: (b.top - width / 2) / width * 2,
                  y2: (b.height + b.top - width / 2) / width * 2
                };
                // Find selected contacts
                const selected = contacts
                  .filter(
                    c =>
                      c.destination.x > bounds.x1 &&
                      c.destination.x < bounds.x2 &&
                      c.destination.y > bounds.y1 &&
                      c.destination.y < bounds.y2
                  )
                  .map(c => c.id);
                updateSelectedContacts(
                  contacts.filter(c => selected.indexOf(c.id) > -1)
                );
              }}
            />
          )}
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
                    selected={
                      selectedContacts
                        ? selectedContacts.indexOf(contact.id) > -1
                        : false
                    }
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
                        hoverContact
                        // && locations[contact.id].opacity > 0.25
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
      targeted
      locked
      disabled
    }
  }
`;

export default graphql(CONTACTS_QUERY, {
  options: ({ sensor }) => ({
    fetchPolicy: "cache-and-network",
    variables: { sensorsId: sensor }
  })
})(withApollo(GridDom));
