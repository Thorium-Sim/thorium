import React, { Component, Fragment } from "react";
import Measure from "react-measure";
import SensorContact from "./SensorContact";
import Segments from "./blackout";
import Interference from "./interference";
import Selection from "./select";

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}
function compareLocs(loc1, loc2) {
  return loc1.x === loc2.x && loc1.y === loc2.y && loc1.z === loc2.z;
}
class InnerGrid extends Component {
  state = { sContacts: {} };
  interval = 1000 / 30;
  componentDidMount() {
    this.contactTimeout = setTimeout(this.contactLoop, this.interval);
  }
  componentWillUnmount() {
    clearTimeout(this.contactTimeout);
  }
  componentDidUpdate(prevProps) {
    // Grab the contacts props and update the locations as necessary
    const { contacts = [] } = this.props;
    const { contacts: prevContacts = [] } = prevProps;
    const { sContacts } = this.state;
    const newContacts = Object.keys(sContacts)
      .map(c => contacts.find(cc => cc.id === c))
      .filter(Boolean)
      .filter(c => {
        const p = prevContacts.find(p => p.id === c.id);
        if (!p) return false;
        return (
          !compareLocs(p.destination, c.destination) ||
          !compareLocs(p.location, c.location) ||
          !compareLocs(p.position, c.position)
        );
      });
    if (newContacts.length === 0) return;
    const updateContacts = newContacts.reduce((prev, next) => {
      prev[next.id] = next;
      return prev;
    }, {});
    this.setState(state => ({
      sContacts: { ...state.sContacts, ...updateContacts }
    }));
  }
  contactLoop = () => {
    this.contactTimeout = setTimeout(this.contactLoop, this.interval);
    const { updateContacts, locationChange, contacts = [] } = this.props;
    const { sContacts } = this.state;
    if (updateContacts) return updateContacts();
    if (contacts.length > 0) {
      const newSContacts = contacts
        .map(this.updateContact(sContacts))
        .reduce((prev, next) => {
          prev[next.id] = next;
          return prev;
        }, {});
      this.setState({
        sContacts: newSContacts
      });
    }
    locationChange && locationChange(sContacts);
  };
  updateContact = sContacts => c => {
    const sContact = sContacts[c.id] || c;
    const { movement = { x: 0, y: 0, z: 0 } } = this.props;
    const x = c.locked ? 0 : movement.x / 100;
    const y = c.locked ? 0 : movement.y / 100;
    const z = c.locked ? 0 : movement.z / 100;
    const destination = {
      ...c.destination,
      x: sContact.destination.x + x,
      y: sContact.destination.y + y,
      z: sContact.destination.z + z
    };
    const location = {
      ...c.location,
      x: sContact.location.x + x,
      y: sContact.location.y + y,
      z: sContact.location.z + z
    };
    const position = {
      ...c.position,
      x: sContact.position.x + x,
      y: sContact.position.y + y,
      z: sContact.position.z + z
    };
    if (c.speed === 0) {
      return { ...c, destination, position, location };
    }
    const time = Date.now() + window.thorium.clockSync;
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
        ((destination.x - location.x) / (endTime - c.startTime)) * currentTime,
      y:
        location.y +
        ((destination.y - location.y) / (endTime - c.startTime)) * currentTime,
      z: 0
    };
    if (endTime < time) {
      return {
        ...c,
        destination,
        position: destination,
        location: destination
      };
    }
    return { ...c, destination, position: newLoc, location };
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
  selectionChange = (a, b) => {
    const { dimensions, contacts, updateSelectedContacts } = this.props;
    const { width: dimWidth, height: dimHeight } = dimensions;
    const width = Math.min(dimWidth, dimHeight);
    if (!b) {
      this.setState({ selectedContacts: [] });
      return;
    }
    const bounds = {
      x1: ((b.left - width / 2) / width) * 2,
      x2: ((b.width + b.left - width / 2) / width) * 2,
      y1: ((b.top - width / 2) / width) * 2,
      y2: ((b.height + b.top - width / 2) / width) * 2
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
    updateSelectedContacts(contacts.filter(c => selected.indexOf(c.id) > -1));
  };
  renderLines = () => {
    const { renderLines, rings = 3, lines = 12, aligned = false } = this.props;

    if (renderLines) return renderLines(this.props);
    return (
      <Fragment>
        {Array(rings)
          .fill(0)
          .map((_, i, array) => (
            <div
              key={`ring-${i}`}
              className="ring"
              style={{
                width: `${((i + 1) / array.length) * 100}%`,
                height: `${((i + 1) / array.length) * 100}%`
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
                transform: `rotate(${((i + (aligned ? 0 : 0.5)) /
                  array.length) *
                  360}deg)`
              }}
            />
          ))}
      </Fragment>
    );
  };
  renderContacts = () => {
    const {
      contacts,
      sensor,
      dimensions,
      core,
      renderContacts,
      selectedContacts,
      hoverContact,
      mouseDown,
      extraContacts = [],
      particles
    } = this.props;
    const { width: dimWidth, height: dimHeight } = dimensions;
    const width = Math.min(dimWidth, dimHeight);

    const { selectedContact, sContacts } = this.state;
    if (renderContacts) return renderContacts(this.props, this.state);
    const contactOutput = []
      .concat(contacts)
      .concat(extraContacts.filter(c => !contacts.find(e => e.id === c.id)))
      .filter(Boolean);
    return contactOutput.map(contact => {
      const extraContact = extraContacts.find(e => e.id === contact.id);
      const { position, location, destination } =
        sContacts[contact.id] || contact;
      return (
        <SensorContact
          key={contact.id}
          width={width}
          core={core}
          sensorsId={sensor}
          {...contact}
          location={position || location}
          destination={extraContact ? extraContact.destination : destination}
          selected={
            selectedContacts
              ? selectedContacts.indexOf(contact.id) > -1
              : contact.id === selectedContact
          }
          mousedown={(e, contact) =>
            mouseDown &&
            mouseDown(e, contact, contact =>
              this.setState({
                selectedContact: contact.id ? contact.id : contact
              })
            )
          }
          mouseover={hoverContact}
          particles={particles}
        />
      );
    });
  };
  render() {
    const {
      core,
      hoverContact,
      dimensions,
      damaged,
      ping,
      interference = 0,
      selectedContacts,
      segments,
      sensor,
      gridMouseDown,
      range
    } = this.props;

    const { width: dimWidth, height: dimHeight } = dimensions;
    const width = Math.min(dimWidth, dimHeight);
    const gridStyle = {
      width: `${width}px`,
      height: `${width}px`,
      borderWidth: core ? `${1}px` : "4px"
    };
    if (!dimensions) return <div id="sensorGrid" />;
    return (
      <div
        id="sensorGrid"
        style={gridStyle}
        onMouseDown={e => {
          this.setState({ selectedContact: null });
          if (hoverContact) hoverContact({});
          gridMouseDown && gridMouseDown(e);
        }}
      >
        <div className={`grid ${ping ? "ping" : ""}`}>
          {damaged && <div className="damaged-sensors" />}
          {interference > 0 && (
            <Interference width={width} interference={interference} />
          )}
          {selectedContacts && (
            <Selection
              containerSelector=".grid"
              onSelectionChange={this.selectionChange}
            />
          )}
          {segments && (
            <Segments segments={segments} {...this.props} sensors={sensor} />
          )}{" "}
          {this.renderLines()}
          <div className="ping-ring" />
          {this.renderContacts()}
          {range && (
            <div
              className="sensor-range"
              style={{
                backgroundColor: range.color,
                transform: `scale(${range.size})`
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

class OuterGrid extends Component {
  state = {};
  render() {
    const { dimensions } = this.state;
    return (
      <Measure
        bounds
        onResize={contentRect => {
          this.setState({ dimensions: contentRect.bounds });
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef} className="sensors-holder">
            {dimensions && (
              <InnerGrid dimensions={dimensions} {...this.props} />
            )}
          </div>
        )}
      </Measure>
    );
  }
}
export default OuterGrid;
