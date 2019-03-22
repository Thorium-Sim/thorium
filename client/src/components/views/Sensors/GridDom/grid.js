import React, { Component, Fragment, useState, useMemo } from "react";
import Measure from "react-measure";
import SensorContact from "./SensorContact";
import Segments from "./blackout";
import Interference from "./interference";
import useContactAnimate from "./useContactAnimate";

const Contacts = props => {
  const {
    contacts,
    includeTypes = [],
    sensor,
    dimensions,
    core,
    selectedContact,
    selectedContacts,
    hoverContact,
    mouseDown,
    extraContacts = [],
    particles,
    movement
  } = props;
  const { width: dimWidth, height: dimHeight } = dimensions;
  const width = Math.min(dimWidth, dimHeight);

  const contactOutput = useMemo(
    () =>
      []
        .concat(contacts)
        .concat(extraContacts.filter(c => !contacts.find(e => e.id === c.id)))
        .filter(Boolean)
        .filter(c =>
          includeTypes.length > 0 ? includeTypes.indexOf(c.type) > -1 : true
        ),
    [contacts, extraContacts, includeTypes]
  );
  const sContacts = useContactAnimate(contactOutput, movement);
  return sContacts.map(contact => {
    const extraContact = extraContacts.find(e => e.id === contact.id);
    const { position, destination } = contact;
    return (
      <SensorContact
        key={contact.id}
        width={width}
        core={core}
        sensorsId={sensor}
        {...contact}
        location={isNaN(position.x) ? destination : position}
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
const Lines = ({ renderLines, rings = 3, lines = 12, aligned = false }) => {
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
              transform: `rotate(${((i + (aligned ? 0 : 0.5)) / array.length) *
                360}deg)`
            }}
          />
        ))}
    </Fragment>
  );
};
const InnerGrid = props => {
  const {
    core,
    hoverContact,
    dimensions,
    damaged,
    ping,
    interference = 0,
    segments,
    sensor,
    gridMouseDown,
    range,
    renderLines,
    rings,
    lines,
    aligned,
    client,
    contacts,
    includeTypes,
    renderContacts,
    selectedContacts,
    mouseDown,
    extraContacts,
    particles,
    movement
  } = props;
  const [selectedContact, setSelectedContact] = useState(null);

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
        setSelectedContact(null);
        if (hoverContact) hoverContact({});
        gridMouseDown && gridMouseDown(e);
      }}
    >
      <div className={`grid ${ping ? "ping" : ""}`}>
        {damaged && <div className="damaged-sensors" />}
        {interference > 0 && (
          <Interference width={width} interference={interference} />
        )}
        {segments && (
          <Segments
            segments={segments}
            sensors={sensor}
            client={client}
            rings={rings}
            lines={lines}
            aligned={aligned}
            dimensions={dimensions}
          />
        )}{" "}
        <Lines
          renderLines={renderLines}
          rings={rings}
          lines={lines}
          aligned={aligned}
        />
        <div className="ping-ring" />
        {renderContacts ? (
          renderContacts(props)
        ) : (
          <Contacts
            selectedContact={selectedContact}
            setSelectedContact={setSelectedContact}
            contacts={contacts}
            includeTypes={includeTypes}
            sensor={sensor}
            dimensions={dimensions}
            core={core}
            selectedContacts={selectedContacts}
            hoverContact={hoverContact}
            mouseDown={mouseDown}
            extraContacts={extraContacts}
            particles={particles}
            movement={movement}
          />
        )}
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
};
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
