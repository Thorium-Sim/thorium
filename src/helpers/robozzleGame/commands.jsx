import React, {Fragment} from "react";

const Red = ({onPointerDown}) => {
  return (
    <div
      className="command paint paint-red"
      onPointerDown={evt => onPointerDown(evt, "paint-red")}
    />
  );
};
const Green = ({onPointerDown}) => {
  return (
    <div
      className="command paint paint-green"
      onPointerDown={evt => onPointerDown(evt, "paint-green")}
    />
  );
};
const Blue = ({onPointerDown}) => {
  return (
    <div
      className="command paint paint-blue"
      onPointerDown={evt => onPointerDown(evt, "paint-blue")}
    />
  );
};
const ColorCommands = ({colors, onPointerDown}) => {
  if (colors === 1) {
    return (
      <Fragment>
        <Red onPointerDown={onPointerDown} />
        <div className="divider" />
      </Fragment>
    );
  }
  if (colors === 2) {
    return (
      <Fragment>
        <Green onPointerDown={onPointerDown} />
        <div className="divider" />
      </Fragment>
    );
  }
  if (colors === 3) {
    return (
      <Fragment>
        <Red onPointerDown={onPointerDown} />
        <Green onPointerDown={onPointerDown} />
        <div className="divider" />
      </Fragment>
    );
  }
  if (colors === 4) {
    return (
      <Fragment>
        <Blue onPointerDown={onPointerDown} /> <div className="divider" />
      </Fragment>
    );
  }
  if (colors === 5) {
    return (
      <Fragment>
        <Red onPointerDown={onPointerDown} />
        <Blue onPointerDown={onPointerDown} /> <div className="divider" />
      </Fragment>
    );
  }
  if (colors === 6) {
    return (
      <Fragment>
        <Green onPointerDown={onPointerDown} />
        <Blue onPointerDown={onPointerDown} /> <div className="divider" />
      </Fragment>
    );
  }
  if (colors === 7) {
    return (
      <Fragment>
        <Red onPointerDown={onPointerDown} />
        <Green onPointerDown={onPointerDown} />
        <Blue onPointerDown={onPointerDown} /> <div className="divider" />
      </Fragment>
    );
  }
  return null;
};
const Commands = ({SubLengths, AllowedCommands, dragging, onPointerDown}) => {
  return (
    <div className={`commands-area ${dragging ? "dragging" : ""}`}>
      <div
        className="command forward"
        onPointerDown={evt => onPointerDown(evt, "forward", "")}
      />
      <div
        className="command left"
        onPointerDown={evt => onPointerDown(evt, "left", "")}
      />
      <div
        className="command right"
        onPointerDown={evt => onPointerDown(evt, "right", "")}
      />
      <div className="divider" />
      {SubLengths.map(
        (s, i) =>
          parseInt(s, 10) > 0 && (
            <div
              key={`sublength-${i}`}
              className={`command f${i + 1}`}
              onPointerDown={evt => onPointerDown(evt, `f${i + 1}`)}
            />
          ),
      )}
      <div className="divider" />
      <ColorCommands
        colors={parseInt(AllowedCommands, 10)}
        onPointerDown={onPointerDown}
      />
      <div
        className="command color clear"
        onPointerDown={evt => onPointerDown(evt, null, "clear")}
      />
      <div
        className="command color red"
        onPointerDown={evt => onPointerDown(evt, null, "red")}
      />
      <div
        className="command color green"
        onPointerDown={evt => onPointerDown(evt, null, "green")}
      />
      <div
        className="command color blue"
        onPointerDown={evt => onPointerDown(evt, null, "blue")}
      />
    </div>
  );
};

export default Commands;
